import UserRow from './UserRow';

function UserTable({ users, onEdit, onDelete, sortConfig, onSort }) {
  return (
    <section className="table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>
              <button type="button" className="sort-btn" onClick={() => onSort('firstName')}>
                First Name {sortConfig?.key === 'firstName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </button>
            </th>
            <th>
              <button type="button" className="sort-btn" onClick={() => onSort('lastName')}>
                Last Name {sortConfig?.key === 'lastName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </button>
            </th>
            <th>
              <button type="button" className="sort-btn" onClick={() => onSort('email')}>
                Email {sortConfig?.key === 'email' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </button>
            </th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default UserTable;
