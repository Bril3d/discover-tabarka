export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-tabarka-blue-50 dark:bg-gray-900 min-h-screen">
      {children}
    </div>
  );
} 