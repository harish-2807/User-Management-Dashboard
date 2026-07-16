function Layout({ title, children }) {
  const showHeader = title !== 'User Management Dashboard';
  return (
    <main className="app-shell">
      {showHeader && (
        <header className="page-header">
          <h1>{title}</h1>
        </header>
      )}
      <div className="dashboard-card">{children}</div>
    </main>
  );
}

export default Layout;
