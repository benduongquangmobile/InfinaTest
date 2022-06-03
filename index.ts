import {Navigation} from 'react-native-navigation';
import {ContimentScreen} from '~/ContimentScreen';
import {DetailCountryScreen} from '~/DetailCountryScreen';
import {HomeScreen} from '~/HomeScreen';

Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('DetailCountryScreen', () => DetailCountryScreen);
Navigation.registerComponent('ContimentScreen', () => ContimentScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'HomeScreen',
            },
          },
        ],
      },
    },
  });
});
