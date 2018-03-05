import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Tooltip from 'material-ui/Tooltip';
import indigo from 'material-ui/colors/indigo';
import grey from 'material-ui/colors/grey';
import { withStyles } from 'material-ui/styles';
import axios from 'axios';
import QuestionAnswer from 'material-ui-icons/QuestionAnswer';
import RemoveRedEye from 'material-ui-icons/RemoveRedEye';
import moment from 'moment';
import approx from 'approximate-number';
import PropTypes from 'prop-types';

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
    color: grey[700],
    textAlign: 'center',
  },
  icon: {
    height: '1em',
    width: '1em',
    paddingLeft: '0.2em',
    verticalAlign: 'middle',
  },
  score: {
    fontSize: '1.3rem',
  },
  asked: {
    fontSize: '0.8rem',
    color: grey[700],
  },
  date: { color: grey[800] },
  userName: {
    color: indigo[400],
    fontWeight: 450,
  },
  reputation: { fontWeight: 500 },
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
    const { data: questions } = await axios.get(url);
    this.setState({ questions });
  }
  formatScore = score => (score > 0 ? '+' : '') + approx(score)
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.questions
        .map(({
          upvotes, downvotes, createdOn, id, answers, views,
          title, excerpt, user: { displayName, reputation },
        }) => {
          const score = this.formatScore(upvotes - downvotes);
          const date = moment(createdOn);
          const isExcerpt = excerpt.length === 100;
          return (
            <Card key={id}>
              <CardContent>
                <Grid container>
                  <Grid item xs={1} container direction="column" alignItems="flex-end" spacing={0} className={classes.leftColumn}>
                    <Grid item>
                      <Tooltip title="Score">
                        <Typography aria-label="Score" className={classes.score}>{score}</Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Answers">
                        <Typography aria-label="Answers">
                          {answers}
                          <QuestionAnswer className={classes.icon} />
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Views">
                        <Typography aria-label="Views">
                          {approx(views)}
                          <RemoveRedEye className={classes.icon} />
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid item xs={11}>
                    <Typography variant="headline" component="h2">{title}</Typography>
                    <Typography component="p" className={isExcerpt ? classes.excerpt : null}>
                      {excerpt.trim()}
                    </Typography>
                    <Typography component="div" align="right" className={classes.asked}>
                      {'asked '}
                      <Tooltip title={date.format('YYYY-MM-DD HH:mm:ss')}>
                        <time dateTime={date.toISOString()} className={classes.date}>
                          {date.fromNow()}
                        </time>
                      </Tooltip>
                      {' by '}
                      <span className={classes.userName}>{displayName}</span>
                      {' '}
                      <Tooltip title="Reputation">
                        <span aria-label="Reputation" className={classes.reputation}>{approx(reputation)}</span>
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
