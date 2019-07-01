import styled from 'styled-components';

export const Container = styled.div`
  background: #FFF;
  border-radius: 5px;
  box-shadow: 3px 2px 0 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 75vh;
  width: 350px;
  margin-left: 10px;
  margin-top: 20px;
  position: relative;
  overflow-y: scroll;
  cursor: default;
  @media (max-width: 768px) {
    display: none;
  }
  section {
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 10px;
    div {
      display: flex;
    }
    img {
      border: 2px solid #7159c1;
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
    p {
      color: #454545;
      font-family: sans-serif;
      font-weight: bold;
      margin: 3px 0 0 10px;
      span {
        color: #949090;
        font-weight: lighter;
      }
    }
    button {
      background: #d55454;
      border: none;
      border-radius: 50%;
      width: 21px;
      height: 23px;
      color: #FFF;
      font-weight: bold;
      font-family: cursive;
      transform: translateY(6px);
      cursor: pointer;
    }
  }
`;
