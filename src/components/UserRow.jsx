function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.department}</td>
      <td>
        <div className="actions-cell">
          <button type="button" className="icon-btn" onClick={() => onEdit(user)} aria-label="Edit user">
            ✎
          </button>
          <button type="button" className="icon-btn" onClick={() => onDelete(user.id)} aria-label="Delete user">
            🗑
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserRow;
