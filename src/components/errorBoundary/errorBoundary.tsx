import React, { ReactNode, ErrorInfo } from 'react';
import s from './errorBoundary.module.scss';

type ErrorBoundaryProps = {
  children: ReactNode;
  errorPlaceholder?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.errorPlaceholder || (
          <div className={s.error}>
            <h2>Упс, ошибка!</h2>
            <p>Извините, что-то пошло не так. Попробуйте перезагрузить страницу.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
