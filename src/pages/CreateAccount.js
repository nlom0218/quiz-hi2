import { useMutation, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import { faCheckSquare, faCircle, faEye, faEyeSlash, faQuestionCircle, faSquare, faSun } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faHome, faMoon, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { darkModeVar } from '../apollo';
import AccountContainer from '../components/Account/AccountContainer';
import EmailForm from '../components/Account/EmailForm';
import ErrMsg from '../components/Account/ErrMsg';
import FormLayout from '../components/Account/FormLayout';
import InputBtn from '../components/InputBtn';
import InputLayout from '../components/Account/InputLayout';
import PageBar from '../components/Account/PageBar';
import PageBarItem from '../components/Account/PageBarItem';
import Title from '../components/Account/Title';
import { onCLickDarkMode } from '../sharedFn';
import QusetionContainer from '../components/Question/QuestionContainer';
import CreateAccountQuestion from '../components/Question/CreateAccountQuestion';
import useTitle from '../hooks/useTitle';

const SelectType = styled.div`
  margin-bottom: 20px;
  .selectBox {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    svg {
      font-size: 14px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
`

const AccountLink = styled.div`
  justify-self: center;
  a {
    font-weight: 600;
    color: ${props => props.theme.blueColor};
  }
`

const AgreeRule = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  font-size: 14px;
  align-items: center;
  line-height: 120%;
  svg {
    margin-right: 10px;
    cursor: pointer;
  }
  .link_btn {
    text-decoration: underline;
    font-weight: 600;
    color: ${props => props.theme.blueColor};
    cursor: pointer;
  }
`

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($type: String!, $email: String, $username: String!, $password: String! $passwordConfirm: String!) {
    createAccount(type: $type, email: $email, username: $username, password: $password, passwordConfirm: $passwordConfirm) {
      ok
      error
    }
  }
`

const CreateAccount = () => {
  const titleUpdataer = useTitle("QUIZ HI | ?????? ??????")
  const [agreeFirst, setAgreeFirst] = useState(false)
  const [agreeSecond, setAgreeSecond] = useState(false)
  const history = useHistory()
  const [doneConfirm, setDoneConfirm] = useState(false)
  const [error, setError] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [visible, setVisible] = useState(false)
  const [questionMode, setQuestionMode] = useState(false)
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { createAccount: { ok, error } } = result
    if (error) {
      setError(error)
    }
    if (ok) {
      history.push("/login")
    }
  }
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted
  })
  const darkMode = useReactiveVar(darkModeVar)
  const [type, setType] = useState("teacher")
  const onClinkType = (type) => {
    if (type === "teacher") {
      setType("teacher")
      setDoneConfirm(false)
    } else if (type === "nomal") {
      setType("nomal")
      setDoneConfirm(true)
    }
  }
  const onClickEye = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  const onSubmit = (data) => {
    const { username, password, passwordConfirm } = data
    if (loading) {
      return
    }
    createAccount({
      variables: {
        username,
        type,
        password,
        passwordConfirm,
        ...(email && { email })
      }
    })
  }
  const onClickQuestionMode = () => {
    setQuestionMode(true)
  }
  const onClickAgreeBtn = (rule) => {
    if (rule === "first") {
      setAgreeFirst(prev => !prev)
    } else {
      setAgreeSecond(prev => !prev)
    }
  }
  const onClickLinkBtn = (rule) => {
    if (rule === "first") {
      window.open("https://quiz-hi.co.kr/notice/18", "_blank")
    } else {
      window.open("https://quiz-hi.co.kr/notice/16", "_blank")
    }
  }
  return (
    <AccountContainer>
      <Title page="????????????" />
      <FormLayout>
        <SelectType>
          <div className="title">?????? ??????</div>
          <div className="selectBox">
            <div className="selectItem">
              <FontAwesomeIcon icon={type === "teacher" ? faCheckCircle : faCircle} onClick={() => onClinkType("teacher")} />
              <span className="typeName">?????????</span>
            </div>
            <div className="selectItem">
              <FontAwesomeIcon icon={type === "nomal" ? faCheckCircle : faCircle} onClick={() => onClinkType("nomal")} />
              <span className="typeName">?????????</span>
            </div>
          </div>
        </SelectType>
        {type === "teacher" && <EmailForm setDoneConfirm={setDoneConfirm} setError={setError} setEmail={setEmail} />}
        <form className="loginCreateAccountForm" onSubmit={handleSubmit(onSubmit)}>
          <InputLayout>
            <span>?????????</span>
            <input type="text" {...register("username", { required: true })} autoComplete="off" />
          </InputLayout>
          <InputLayout>
            <span>
              ????????????
                <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={onClickEye} />
            </span>
            <input type={visible ? "text" : "password"} {...register("password", { required: true })} autoComplete="off" />
          </InputLayout>
          <InputLayout>
            <span>
              ???????????? ??????
            </span>
            <input type={visible ? "text" : "password"} {...register("passwordConfirm", { required: true })} autoComplete="off" />
          </InputLayout>
          <AgreeRule>
            <FontAwesomeIcon icon={agreeFirst ? faCheckSquare : faSquare} onClick={() => onClickAgreeBtn("first")} />
            <div>???????????? <span className="link_btn" onClick={() => onClickLinkBtn("first")}>????????????</span>??? ???????????????.</div>
          </AgreeRule>
          <AgreeRule>
            <FontAwesomeIcon icon={agreeSecond ? faCheckSquare : faSquare} onClick={() => onClickAgreeBtn("second")} />
            <div>???????????? <span className="link_btn" onClick={() => onClickLinkBtn("second")}>???????????? ????????????</span>??? ???????????????.</div>
          </AgreeRule>
          {error ? <ErrMsg error={error} /> : null}
          <InputBtn value="????????????" disabled={!isValid || !doneConfirm || !agreeFirst || !agreeSecond} bgColor="rgb(42, 140, 0, 0.6)" />
          <AccountLink>
            ????????? ???????????????? <Link to="/login"><span>?????????</span></Link>
          </AccountLink>
        </form>
      </FormLayout>
      <PageBar>
        <PageBarItem>
          <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
        </PageBarItem>
        <PageBarItem>
          <FontAwesomeIcon
            icon={darkMode ? faSun : faMoon}
            onClick={() => onCLickDarkMode(darkMode)}
            style={{ color: `${darkMode ? "#ff765e" : "#212121"}` }}
          />
        </PageBarItem>
        <PageBarItem>
          <FontAwesomeIcon icon={faQuestionCircle} onClick={onClickQuestionMode} />
        </PageBarItem>
      </PageBar>
      {questionMode && <QusetionContainer pageTitle="????????????" setQuestionMode={setQuestionMode} >
        <CreateAccountQuestion />
      </QusetionContainer>}
    </AccountContainer >);
}

export default CreateAccount;