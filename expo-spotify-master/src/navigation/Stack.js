import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// navigation
import TabNavigation from './TabNavigation';

// screens
import ModalEpisodePlayer from '../screens/ModalEpisodePlayer';
import ModalMoreOptions from '../screens/ModalMoreOptions';

const StackNavigator = createStackNavigator(
  {
    // Main Tab Navigation
    // /////////////////////////////////////////////////////////////////////////
    TabNavigation,

    // Modals
    // /////////////////////////////////////////////////////////////////////////
    ModalEpisodePlayer,
    ModalMoreOptions: {
      screen: ModalMoreOptions,
      navigationOptions: {
        cardStyle: { backgroundColor: '#000000' }
      }
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'TabNavigation',
    mode: 'modal'
  }
);

const App = createAppContainer(StackNavigator);

export default App;
