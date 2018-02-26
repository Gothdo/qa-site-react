import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Tooltip from 'material-ui/Tooltip';
import indigo from 'material-ui/colors/indigo';
import grey from 'material-ui/colors/grey';
import axios from 'axios';
import QuestionAnswer from 'material-ui-icons/QuestionAnswer';
import RemoveRedEye from 'material-ui-icons/RemoveRedEye';
import moment from 'moment';
import approx from 'approximate-number';

export default class QuestionList extends React.Component {
  state = { questions: [] };
  async componentWillMount() {
    const { data: questions } = await axios.get('http://localhost:3000/questions/recent');
    this.setState({ questions });
  }
  render() {
    return (
      <div style={{ margin: '0 auto', maxWidth: '800px' }}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <style>{`
          .question-excerpt::after {
            content: '…';
          }
        `}
        </style>
        {this.state.questions
        .map(({
          upvotes, downvotes, createdOn, id, answers, views,
          title, excerpt, user: { displayName, reputation },
        }) => {
          const score = upvotes - downvotes;
          const date = moment(createdOn);
          const iconStyles = {
            height: '1em', width: '1em', paddingLeft: '0.2em', verticalAlign: 'middle',
          };
          const isExcerpt = excerpt.length === 100;
          return (
            <Card key={id}>
              <CardContent>
                <Grid container>
                  <Grid item xs={1} container direction="column" alignItems="flex-end" spacing={0} style={{ color: grey[700], textAlign: 'center' }}>
                    <Grid item>
                      <Tooltip title="Score">
                        <Typography aria-label="Score" style={{ fontSize: '1.3rem' }}>
                          {(score > 0 ? '+' : '') + approx(score)}
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Answers">
                        <Typography aria-label="Answers">
                          {answers}
                          <QuestionAnswer style={iconStyles} />
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Views">
                        <Typography aria-label="Views">
                          {approx(views)}
                          <RemoveRedEye style={iconStyles} />
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid item xs={11}>
                    <Typography variant="headline" component="h2">{title}</Typography>
                    <Typography component="p" className={isExcerpt ? 'question-excerpt' : null}>
                      {excerpt.trim()}
                    </Typography>
                    <Typography component="p" align="right" style={{ fontSize: '0.8rem', color: grey[700] }}>
                      {'asked '}
                      <Tooltip title={date.format('YYYY-MM-DD HH:mm:ss')}>
                        <time dateTime={date.toISOString()} style={{ color: grey[800] }}>
                          {date.fromNow()}
                        </time>
                      </Tooltip>
                      {' by '}
                      <span style={{ color: indigo[400], fontWeight: 450 }}>{displayName}</span>
                      {' '}
                      <Tooltip title="Reputation">
                        <span aria-label="Reputation" style={{ fontWeight: 500 }}>{approx(reputation)}</span>
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
