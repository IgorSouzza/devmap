import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 74vw;
  height: 90vh;
  z-index: 100;
  section {
    background-color: #FFF;
    border-radius: 5px;
    color: #454545;
    font-family: sans-serif;
    padding: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-size: 16px;
      margin: 0 0 30px 0;
      width: 290px;
      text-align: center;
    }
  }
  input {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px 5px;
    width: 95%;
    outline: 0;
  }
  button {
    background: #85c47c;
    border-radius: 5px;
    border: none;
    color: #FFF;
    margin-top: 10px;
    padding: 10px 50px;
    font-weight: bold;
    outline: 0;
    cursor: pointer;
    &:first-child {
      background: #ccc;
      margin-right: 13px;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
`;
