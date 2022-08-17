import { FormattedMessage } from "react-intl";

export default function Custom404() {
  return (
    <>
      <div className="text-center py-32">
        <h1 className="text-3xl font-medium mb-4">
          <FormattedMessage id="error.404.title" />
        </h1>
        <p className="text-white/60">
          <FormattedMessage id="error.404.description" />
        </p>
      </div>
    </>
  );
}
