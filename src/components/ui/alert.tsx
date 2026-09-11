const Alert = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      role="alert"
      className="relative w-full rounded-lg border border-accent/50 bg-accent/10 px-4 py-3 text-sm text-accent"
      {...props}
    >
      {children}
    </div>
  );
};

const AlertTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5 className="mb-1 font-medium" {...props} />
);

const AlertDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="text-sm" {...props} />
);

export { Alert, AlertTitle, AlertDescription };
