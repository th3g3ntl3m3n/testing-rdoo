import React from 'react';
import styled from 'styled-components';


export const Wrapper = styled.div`
  background-color: #ededed;
  width: 100vw;
  height: 100vh;
  overflow:hidden;
  display:grid;
  place-items:center;
`;

export const Container = styled.div`
  width: 40vw;
  height: 80vh;
  overflow: hidden;
  display:flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 3px 30px rgba(0,0,0,0.2);
  border-radius: 10px;
  margin-right: 5px;
`;

export const Header = styled.div`
  background-color: lightgreen;
  color: #323232;
  font-weight: bold;
  padding: 1.2em;
`;

export const FlexRow = styled.div`
  display:flex;
  flex-direction: row;
`;
