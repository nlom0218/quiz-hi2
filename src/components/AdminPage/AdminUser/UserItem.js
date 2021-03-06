import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserEditBox from './UserEditBox';

const Container = styled.li`
  padding: 17px 20px;
  line-height: 160%;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-columns: 1fr 3fr 4fr 3fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 20px;
  :hover {
    background-color: ${props => props.theme.grayColor};
  }
`

const EditBtn = styled.div`
  justify-self: flex-end;
  cursor: pointer;
`

const UserItem = ({ id, username, nickname, email, type }) => {
  const [editMode, setEditMode] = useState(false)
  const processType = () => {
    if (type === "teacher") {
      return "선생님"
    } else if (type === "nomal") {
      return "일반"
    } else {
      return "학생"
    }
  }
  useEffect(() => {
    setEditMode(false)
  }, [type])
  const onClickEdit = () => {
    setEditMode(prev => !prev)
  }
  const onCLickUser = () => {
    window.open(`/profile/${username}/info`, "_blank")
  }
  return (<Container>
    <div>{id}</div>
    <div onClick={onCLickUser}
      style={{ cursor: "pointer" }}
    >{username}</div>
    <div>{email}</div>
    <div>{nickname}</div>
    <div>{processType()}</div>
    <EditBtn><FontAwesomeIcon icon={faCog} onClick={onClickEdit} /></EditBtn>
    {editMode && <UserEditBox username={username} type={type} />}
  </Container>);
}

export default UserItem;