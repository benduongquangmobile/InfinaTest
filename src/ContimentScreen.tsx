import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import styled from 'styled-components';
import {client} from './service';

const CONTIMENT_QUERY = gql`
  query GetContiment($country_code: ID!) {
    continent(code: $country_code) {
      code
      name
      countries {
        code
        name
      }
    }
  }
`;

type Props = {};
export const ContimentScreen: NavigationFunctionComponent<Props> = ({
  continent: {name, code},
  componentId,
}: any) => {
  const {loading, data} = useQuery(CONTIMENT_QUERY, {
    client,
    variables: {
      country_code: code,
    },
  });

  console.log('name, code', name, code);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <ScrollView>
      <Container>
        <Title>{name}</Title>
        <Body>
          <Collunm1>
            <Text>Code</Text>
            <Text>Countries</Text>
          </Collunm1>
          <Collunm2>
            <RightText>{code}</RightText>
            <>
              {data?.continent?.countries.map((country: any) => (
                <TouchableOpacity
                  onPress={() => {
                    Navigation.push(componentId, {
                      component: {
                        name: 'DetailCountryScreen',
                        passProps: {
                          country,
                        },
                      },
                    });
                  }}>
                  <LinkButton key={country.code}>{country.name}</LinkButton>
                </TouchableOpacity>
              ))}
            </>
          </Collunm2>
        </Body>
      </Container>
    </ScrollView>
  );
};

const RightText = styled.Text`
  text-align: right;
`;

const LinkButton = styled.Text`
  color: blue;
  text-decoration: underline;
  text-align: right;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
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
