import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import styled from 'styled-components/native';
import {getScreenStyle} from './misc/getScreenStyle';
import {client} from './service';
import {Navigation} from 'react-native-navigation';

const COUNTRIES_QUERY = gql`
  query GetCountried {
    countries {
      name
      code
      emoji
      capital
      currency
      phone
      continent {
        name
        code
      }
      languages {
        name
      }
    }
  }
`;

export const HomeScreen: NavigationFunctionComponent<Props> = props => {
  const {loading, data} = useQuery(COUNTRIES_QUERY, {
    client,
  });
  console.log('data', data);

  const HeaderList = (
    <>
      <Header />
      <Title>List of countries</Title>
    </>
  );

  const ItemList = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'DetailCountryScreen',
              passProps: {
                country: item,
              },
            },
          })
        }>
        <View style={styles.shadow}>
          <Item>
            <ImageCountry>{item.emoji}</ImageCountry>
            <RightColumn>
              <ItemTitle>{item.name}</ItemTitle>
              <Subtitle>{item.capital}</Subtitle>
            </RightColumn>
          </Item>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <Root>
      <FlatList
        renderItem={ItemList}
        ListHeaderComponent={HeaderList}
        data={data?.countries || []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.code}
      />
    </Root>
  );
};

//#region
type Props = {};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

const ItemTitle = styled.Text`
  font-weight: bold;
`;

const Item = styled.View`
  flex-direction: row;
  background-color: #fff;
  margin-top: 20px;
  margin-horizontal: 20px;
  padding-horizontal: 15px;
`;

const ImageCountry = styled.Text`
  font-size: 60px;
`;

const Root = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  height: 300px;
  width: 100%;
  background-color: #ffc0cb;
  border-bottom-left-radius: 30px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const RightColumn = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 10px;
`;

const Subtitle = styled.Text`
  color: #828282;
  margin-top: 5px;
`;

HomeScreen.options = getScreenStyle();
//#endregion
