import React from 'react';
import styled from 'styled-components';
import { collectionMenuFadeIn, collectionMenuFadeOut } from '../../animation/fade';
import { customMedia } from '../../styles';

const SContents = styled.div`
  width: 100%;
  position: absolute;
  top: ${props => props.seeMenu ? "-200px" : "50px"};
  top: ${props => props.seeMenu ? "-12.5rem" : "3.125rem"};
  background-color: ${props => props.theme.fontColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 0px 30px;
  padding: 0px 1.875rem;
  animation: ${props => props.seeMenu ? collectionMenuFadeIn : collectionMenuFadeOut} 1s ease forwards;
  z-index: -1;
  ${customMedia.greaterThan("tablet")`
    top: ${props => props.seeMenu ? "-100px" : "50px"};
    top: ${props => props.seeMenu ? "-6.25rem" : "3.125rem"};
  `}
  ${customMedia.greaterThan("desktop")`
    position: static;
    padding: 0px;
    margin-left: 30px;
    margin-left: 1.875rem;
    z-index: 1;
  `}
`

const ContentsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
  ${customMedia.greaterThan("desktop")`
    display: flex;
  `}
`

const ContentsItem = styled.li`
  font-size: 0.875em;
  font-size: 0.875rem;
  cursor: pointer;
  ${customMedia.greaterThan("desktop")`
    margin-left: 30px;
    margin-left: 1.875rem;
  `}
`

const ItemDot = styled.span`
  margin-right: 10px;
  margin-right: 0.625rem;
`

const Contents = ({ seeMenu }) => {
  return (<SContents seeMenu={seeMenu}>
    <ContentsList>
      <ContentsItem><ItemDot>•</ItemDot> 스피드 퀴즈</ContentsItem>
      <ContentsItem><ItemDot>•</ItemDot> 스피드 퀴즈</ContentsItem>
      <ContentsItem><ItemDot>•</ItemDot> 스피드 퀴즈</ContentsItem>
      <ContentsItem><ItemDot>•</ItemDot> 스피드 퀴즈</ContentsItem>
    </ContentsList>
  </SContents>);
}

export default Contents;