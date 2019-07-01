import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 40px;
  left: 10px;
  overflow: visible;
  @media (max-width: 768px) {
    left: 0px;
  }
`;

export const UserAvatar = styled.img`
  border: 2px solid #7159c1;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;
