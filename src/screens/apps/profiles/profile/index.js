import React from 'react';
import LoggedScreen from './_logged';
import NotLoggedSCreen from './_notLogged';

class ProfileScreen extends React.Component {
  checkLogin = () => {
    const { token } = this.props.currentUser;
    return token && token.length !== '';
  }

  render() {
    const { navigation } = this.props;
    return this.checkLogin()
      ? <LoggedScreen {...this.props} />
      : <NotLoggedSCreen navigation={navigation} />;
  }
}

export default ProfileScreen;
