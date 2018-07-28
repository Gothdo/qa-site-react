import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import approx from 'approximate-number';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import uuid from 'uuid-base64';
import { RelativeDate, formatScore } from './helpers';

const styles = () => ({
  root: {
    margin: '20px auto',
    maxWidth: 800,
  },
  excerpt: {
    '&::after': {
      content: '"…"',
    },
  },
  leftColumn: {
    color: grey[800],
    textAlign: 'center',
  },
  icon: {
    width: '0.8em',
    height: '0.8em',
    paddingLeft: '0.2em',
    verticalAlign: 'middle',
  },
  score: {
    fontSize: '1.3em',
  },
  asked: {
    fontSize: '0.8em',
    color: grey[600],
    marginTop: 4,
  },
  reputation: { fontWeight: 'bold' },
  title: {
    fontSize: '1.3em',
  },
});

class QuestionList extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    unansweredOnly: PropTypes.bool,
  }

  static defaultProps = {
    unansweredOnly: false,
  }

  state = { questions: [] }

  componentWillMount = async () => {
    const { unansweredOnly } = this.props;
    const url = `http://localhost:3000/questions/${unansweredOnly ? 'unanswered' : 'recent'}`;
    const { data: { data: questions } } = await axios.get(url);
    this.setState({ questions });
  }

  render() {
    const { classes } = this.props;
    const { questions } = this.state;
    return (
      <div className={classes.root}>
        {questions.map(({
          upvotes, downvotes, createdOn, id, answers, views,
          title, excerpt, user: { id: userId, displayName, reputation },
        }) => {
          const score = formatScore(upvotes - downvotes);
          const isExcerpt = excerpt.length === 100;
          return (
            <Card key={id}>
              <CardContent>
                <Grid container spacing={16}>
                  <Grid item xs={1} container direction="column" alignItems="flex-end" spacing={0} className={classes.leftColumn}>
                    <Grid item>
                      <Tooltip title="Score">
                        <Typography className={classes.score} color="inherit">
                          {score}
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Answers">
                        <Typography color="inherit">
                          {answers}
                          <QuestionAnswer className={classes.icon} />
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Views">
                        <Typography color="inherit">
                          {approx(views)}
                          <RemoveRedEye className={classes.icon} />
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid item xs={11}>
                    <Typography variant="headline" component="h2" className={classes.title}>
                      <RouterLink to={`/question/${uuid.encode(id)}`} className={classes.questionLink}>
                        {title}
                      </RouterLink>
                    </Typography>
                    <Typography className={isExcerpt ? classes.excerpt : null}>
                      {excerpt.trim()}
                    </Typography>
                    <Typography component="div" align="right" className={classes.asked}>
                      {'asked '}
                      <RelativeDate raw={createdOn} />
                      {' by '}
                      <RouterLink
                        to={`/user/${uuid.encode(userId)}/profile`}
                        className={classes.userName}
                      >
                        {displayName}
                      </RouterLink>
                      {' '}
                      <Tooltip title="Reputation">
                        <span className={classes.reputation}>
                          {approx(reputation)}
                        </span>
                      </Tooltip>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(QuestionList);
