import Translate from '@components/Translate';

function ErrorMessage({ message }) {
  return (
    <div>
      <p>
        <Translate text={message} />
      </p>
    </div>
  );
}

export default ErrorMessage;
