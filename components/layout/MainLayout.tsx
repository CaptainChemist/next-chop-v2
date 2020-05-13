import { ThemeProvider } from 'styled-components';
import { Component } from 'react';
import { theme } from '../../utils/theme';
import { GlobalStyle } from '../../utils/globalStyle';

export class MainLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    );
  }
}
