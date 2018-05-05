import {connect} from 'react-redux';
import Footer from '../components/Footer';

const mapStateToProps = state => {
  return {
    userCount: state.subscription.userCount
  };
};

const FooterContainer = connect(
  mapStateToProps
)(Footer);

export default FooterContainer;
