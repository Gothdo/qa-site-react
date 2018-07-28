import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import approx from 'approximate-number';
import PropTypes from 'prop-types';
import uuid from 'uuid-base64';
import VoteUp from '@material-ui/icons/KeyboardArrowUp';
import VoteDown from '@material-ui/icons/KeyboardArrowDown';
import { Link as RouterLink } from 'react-router-dom';
import { RelativeDate, formatScore, renderMarkdown } from './helpers';

const postMetadataStyles = () => ({
  root: {
    marginTop: 16,
    color: grey[600],
  },
  score: {
    fontSize: '1.2em',
    margin: '0 4px',
  },
  voteContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  voteTooltip: {
    display: 'inline-flex',
  },
  reputation: { fontWeight: 'bold' },
});

const PostMetadataUnstyled = ({ answer, post, classes }) => {
  const score = formatScore(post.upvotes - post.downvotes);
  return (
    <Grid container justify="space-between" className={classes.root}>
      <Grid item className={classes.voteContainer}>
        <Tooltip title="Vote up" className={classes.voteTooltip}>
          <VoteUp className={classes.voteButton} />
        </Tooltip>
        <Tooltip title="Score">
          <Typography className={classes.score} color="inherit">
            {score}
          </Typography>
        </Tooltip>
        <Tooltip title="Vote down" className={classes.voteTooltip}>
          <VoteDown className={classes.voteButton} />
        </Tooltip>
      </Grid>
      <Grid item>
        <Typography component="div" color="inherit">
          {answer ? 'answered ' : 'asked '}
          <RelativeDate raw={post.createdOn} />
          {' by '}
          <RouterLink
            className={classes.userName}
            to={`/user/${uuid.encode(post.user.id)}/profile`}
          >
            {post.user.displayName}
          </RouterLink>
          {' '}
          <Tooltip title="Reputation">
            <span className={classes.reputation}>
              {approx(post.user.reputation)}
            </span>
          </Tooltip>
        </Typography>
      </Grid>
    </Grid>
  );
};
PostMetadataUnstyled.propTypes = {
  answer: PropTypes.bool,
  post: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};
PostMetadataUnstyled.defaultProps = {
  answer: false,
};
const PostMetadata = withStyles(postMetadataStyles)(PostMetadataUnstyled);

const styles = () => ({
  root: {
    margin: '20px auto',
    maxWidth: 800,
  },
  card: {
    marginBottom: 20,
  },
});

class Question extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    id: PropTypes.string.isRequired,
  }

  state = {}

  componentWillMount = async () => {
    const { id } = this.props;
    const url = `http://localhost:3000/question/${uuid.decode(id)}`;
    const { data: question } = await axios.get(url);
    this.setState({ question });
  }

  render() {
    const { classes } = this.props;
    const { question } = this.state;
    if (!question) return null;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" component="h1">
              {question.title}
            </Typography>
            <Typography component="div" gutterBottom>
              {renderMarkdown(question.content)}
            </Typography>
            <PostMetadata post={question} />
          </CardContent>
        </Card>
        {question.answers.map(answer => (
          <Card key={answer.id} className={classes.card}>
            <CardContent>
              <Typography component="div">
                {renderMarkdown(answer.content)}
              </Typography>
              <PostMetadata answer post={answer} />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Question);
