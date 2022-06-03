import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import styled from 'styled-components/native';
import {client} from './service';
type Props = {};

const COUNTRY_QUERY = gql`
  query GetCountry($country_code: ID!) {
    country(code: $country_code) {
      code
      name
      emoji
      phone
      continent {
        code
        name
      }
    }
  }
`;

export const DetailCountryScreen: NavigationFunctionComponent<Props> = ({
  country,
  componentId,
}: any) => {
  console.log('componentId', {
    code: country?.code,
    name: country?.name,
  });

  const {loading, data} = useQuery(COUNTRY_QUERY, {
    client,
    variables: {
      country_code: country?.code,
    },
  });

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <Container>
      <ImageCountry>{country?.emoji || data.country.emoji}</ImageCountry>
      <Title>{country?.name}</Title>
      <Body>
        <Collunm1>
          <Text>Alpha2Code</Text>
          <Text>CallingCodes</Text>
          <Text>Continent</Text>
        </Collunm1>
        <Collunm2>
          <RightText>{country?.code || data?.country?.code}</RightText>
          <RightText>{country?.phone || data?.country?.phone}</RightText>
          <TouchableOpacity
            onPress={() => {
              Navigation.push(componentId, {
                component: {
                  name: 'ContimentScreen',
                  passProps: {
                    continent: {
                      code: data.country.continent.code,
                      name: data.country.continent.name,
                    },
                  },
                },
              });
            }}>
            <LinkButton>{data?.country?.continent?.name}</LinkButton>
          </TouchableOpacity>
        </Collunm2>
      </Body>
    </Container>
  );
};

const LinkButton = styled.Text`
  color: blue;
  text-decoration: underline;
  text-align: right;
`;

const RightText = styled.Text`
  text-align: right;
`;

const Body = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 20px;
  margin-horizontal: 20px;
`;

const Collunm1 = styled.View`
  flex: 1;
`;

const Collunm2 = styled.View`
  flex: 1;
`;

const ImageCountry = styled.Text`
  font-size: 100px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;
