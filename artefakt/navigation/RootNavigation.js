import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Header, StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { capitalize } from 'lodash';

import AuthenticationScreen from '../screens/AuthenticationScreen';
import ArtworkDetailsScreen from '../screens/ArtworkDetailsScreen';
import ArtworkListScreen from '../screens/ArtworkListScreen';
import ArtworkMapScreen from '../screens/ArtworkMapScreen';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import SettingsScreen from '../screens/SettingsScreen';

const ListStack = StackNavigator(
  {
    list: {
      screen: ArtworkListScreen,
    },
    details: {
      screen: ArtworkDetailsScreen,
    },
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
  }
);

const SettingsStack = StackNavigator(
  {
    mainSettings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: {
      title: 'Settings',
      headerTitleStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 17,
        letterSpacing: -0.5,
        fontWeight: Platform.OS === 'android' ? '400' : 'normal',
      },
      headerStyle: {
        backgroundColor: '#fff',
        ...Platform.select({
          android: {
            paddingTop: Constants.statusBarHeight,
            height: Header.HEIGHT + Constants.statusBarHeight,
          },
        }),
      },
    },
  }
);

const TabLayout = TabNavigator(
  {
    list: {
      screen: ListStack,
    },
    map: {
      screen: ArtworkMapScreen,
    },
    settings: {
      screen: SettingsStack,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: () => {
        const { routeName } = navigation.state;
        let label = capitalize(routeName);
        if (label === 'List') {
          return 'Public Artworks';
        } else {
          return label;
        }
      },
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'list':
            iconName = Platform.OS === 'ios' ? 'ios-list' : 'md-list';
            break;
          case 'map':
            iconName = Platform.OS === 'ios' ? 'ios-map-outline' : 'md-map';
            break;
          case 'settings':
            iconName =
              Platform.OS === 'ios' ? 'ios-options-outline' : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={Platform.OS === 'ios' ? 30 : 27}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

export default StackNavigator(
  {
    tabs: {
      screen: TabLayout,
    },
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#ffb82b',
    },
  }
);
