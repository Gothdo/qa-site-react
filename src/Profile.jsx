import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import LinkIcon from '@material-ui/icons/Link';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import uuid from 'uuid-base64';
import PropTypes from 'prop-types';
import approx from 'approximate-number';
import { renderMarkdown, RelativeDate, GitHubIcon } from './helpers';

const styles = () => ({
  root: {
    margin: '20px auto',
    maxWidth: 600,
  },
  profilePicture: {
    float: 'right',
  },
  meta: {
    fontSize: '0.9em',
    color: grey[800],
  },
  icon: {
    width: '18px',
    height: '18px',
    verticalAlign: 'middle',
    marginRight: '5px',
  },
  profileLink: {
    verticalAlign: 'middle',
  },
});

class Profile extends React.Component {
  static propTypes = {
    match: PropTypes.shape().isRequired,
    classes: PropTypes.shape().isRequired,
  }

  state = {}

  async componentWillMount() {
    const { match } = this.props;
    const url = `http://localhost:3000/user/${uuid.decode(match.params.id)}/profile`;
    const { data: user } = await axios.get(url);
    this.setState({ user });
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    if (!user) return null;
    return (
      <Card className={classes.root}>
        <CardContent>
          {user.imageUrl && (
            <img
              src={`http://localhost:3000/${user.imageUrl}`}
              alt="User avatar"
              width="100"
              height="100"
              className={classes.profilePicture}
            />
          )}
          <Typography variant="headline" gutterBottom>
            {user.displayName}
          </Typography>
          <div className={classes.meta}>
            <Typography gutterBottom color="inherit">
              {'joined '}
              <RelativeDate raw={user.accountCreatedDate} />
            </Typography>
            <Typography gutterBottom color="inherit">
              {approx(user.profileViews)}
              {' profile views'}
            </Typography>
            {user.githubUsername && (
              <Typography>
                <GitHubIcon className={classes.icon} />
                <a
                  href={`https://github.com/${encodeURIComponent(user.githubUsername)}`}
                  className={classes.profileLink}
                >
                  {user.githubUsername}
                </a>
              </Typography>
            )}
            {user.website && (
              <Typography>
                <LinkIcon className={classes.icon} />
                <a href={user.website} className={classes.profileLink}>
                  {user.website.replace(/^https?:\/\//i, '').replace(/\/$/, '')}
                </a>
              </Typography>
            )}
          </div>
          <Typography component="div">
            {user.about && renderMarkdown(user.about)}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Profile);
