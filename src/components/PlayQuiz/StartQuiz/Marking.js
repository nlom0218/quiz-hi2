import React from 'react';
import styled from 'styled-components';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compare } from '../../../sharedFn';

const SMarking = styled.div`
  align-self: flex-start;
  margin: 20px 40px;
  font-size: 18px;
  max-height: 340px;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

const MarkingMsg = styled.div`
  align-self: flex-end;
`

const CheckAll = styled.div`
  font-size: 16px;
  cursor: pointer;
  background-color: tomato;
  padding: 10px 20px;
  border-radius: 5px;
`

const MarkingStudent = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid rgb(200, 200, 200, 0.8);
  background-color: rgb(200, 200, 200, 0.8);
  row-gap: 1px;
  column-gap: 1px;
`

const Student = styled.div`
  padding: 15px 20px;
  background-color: rgb(42, 140, 0);
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  svg {
    cursor: pointer;
  }
`

const Marking = ({ student, setPassStudentArr, passStudentArr, question, setFailStudentArr, failStudentArr, questionNum, totalNum }) => {
  const quizMode = localStorage.getItem("selectMode")
  const onClickCheckAll = () => {
    if (quizMode === "goldenBell") {
      if (!question.consolation) {
        setPassStudentArr([])
        setFailStudentArr([...passStudentArr, ...failStudentArr])
      } else {
        setPassStudentArr([...passStudentArr, ...failStudentArr])
        setFailStudentArr([])
      }
    } else {
      setPassStudentArr([])
      setFailStudentArr([...passStudentArr, ...failStudentArr])
    }
  }

  const onClickStudentCheck = (id) => {
    if (passStudentArr.includes(id)) {
      setPassStudentArr(passStudentArr.filter((item) => item !== id))
      setFailStudentArr([...failStudentArr, id])
    } else {
      setPassStudentArr([...passStudentArr, id])
      setFailStudentArr(failStudentArr.filter((item) => item !== id))
    }
  }

  const processPassStudent = (id) => {
    if (passStudentArr.includes(id)) {
      return true
    } else {
      return false
    }
  }

  const processConsolationQuestion = () => {
    if (localStorage.getItem("selectMode") !== "goldenBell") {
      return false
    }
    if (question.consolation === true) {
      return true
    } else {
      return false
    }
  }
  return (<SMarking>
    {questionNum !== totalNum ?
      <MarkingMsg>
        {processConsolationQuestion() ? "??????????????? ?????????" : "?????????"} ?????? ????????? ????????? ??? ?????? ????????? ????????? ?????????.
      </MarkingMsg>
      :
      <MarkingMsg>
        ????????? ???????????????. ????????? ?????? ????????? ????????? ??? ?????? ????????? ?????? ?????????.
      </MarkingMsg>
    }
    {processConsolationQuestion() ?
      <CheckAll onClick={onClickCheckAll}>?????? ????????????</CheckAll>
      :
      <CheckAll onClick={onClickCheckAll}>?????? ????????????</CheckAll>}
    <MarkingStudent>
      {student.sort(compare("id")).map((item, index) => {
        if (question.consolation) {
          if (item.pass === true) {
            return
          }
          return <Student key={index}>
            <div>{item.order}??? {item.nickname.length > 8 ? `${item.nickname.substring(0, 8)}...` : item.nickname}</div>
            <div onClick={() => onClickStudentCheck(item.id)}>
              <FontAwesomeIcon icon={processPassStudent(item.id) ? faCheckSquare : faSquare} />
            </div>
          </Student>
        }
        if (item.pass === false) {
          return
        }
        return <Student key={index}>
          <div>{item.order}??? {item.nickname.length > 8 ? `${item.nickname.substring(0, 8)}...` : item.nickname}</div>
          <div onClick={() => onClickStudentCheck(item.id)}>
            <FontAwesomeIcon icon={processPassStudent(item.id) ? faCheckSquare : faSquare} />
          </div>
        </Student>
      })}
    </MarkingStudent>
  </SMarking>);
}

export default Marking;