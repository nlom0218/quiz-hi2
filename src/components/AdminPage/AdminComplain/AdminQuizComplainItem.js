import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ContentItem } from '../sharedCss';
import AdaminQuizDetail from './AdaminQuizDetail';

const AdminQuizComplainItem = ({ id, title, QuizComplain, user: { username }, complain, deleteDay }) => {
  const [seeInfo, setSeeInfo] = useState(false)
  const onCLickTitle = () => {
    window.open(`/detail/quiz/${id}`, "_blank")
  }
  const onCLickUser = () => {
    window.open(`/profile/${username}/info`, "_blank")
  }
  const onClickInfoBtn = () => {
    setSeeInfo(prev => !prev)
  }

  return (<ContentItem>
    <div>{id}</div>
    <div className="link_btn" onClick={onCLickUser}>{username}</div>
    <div className="link_btn" onClick={onCLickTitle}>{title}</div>
    <div className="detail_content"><FontAwesomeIcon icon={faInfoCircle} onClick={onClickInfoBtn} /></div>
    {seeInfo && <AdaminQuizDetail QuizComplain={QuizComplain} />}
  </ContentItem>);
}

export default AdminQuizComplainItem;