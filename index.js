/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import codePush from 'react-native-code-push';

AppRegistry.registerComponent(appName, () =>
  codePush({
    updateDialog: true,
    installMode: codePush.InstallMode.IMMEDIATE,
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
  })(App),
);
