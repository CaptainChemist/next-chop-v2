import { Spin } from 'antd';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 200px 0;
`;

export const Loading = () => (
  <StyledSpinner>
    <Spin size="large" />
  </StyledSpinner>
);
