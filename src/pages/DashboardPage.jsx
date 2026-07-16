import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import UserTable from '../components/UserTable';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';
import SearchBar from '../components/SearchBar';
import FilterPopup from '../components/FilterPopup';
import Pagination from '../components/Pagination';
import { addUser, deleteUser, getUsers, updateUser } from '../services/api';

const DEPARTMENTS = ['HR', 'IT', 'Finance', 'Marketing', 'Sales'];

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'asc' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await getUsers();
        const usersWithDepartments = response.data.map((user) => ({
          ...user,
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ').slice(1).join(' '),
          department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
        }));

        setUsers(usersWithDepartments);
      } catch (err) {
        setError('Unable to load users.');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setToastMessage('');
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  async function handleAddUser(formData) {
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      };

      const response = await addUser(payload);
      const newUser = {
        ...response.data,
        firstName: formData.firstName,
        lastName: formData.lastName,
        department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
      };

      setUsers((currentUsers) => [newUser, ...currentUsers]);
      setIsModalOpen(false);
      setSelectedUser(null);
      setError('');
      setToastMessage('User added successfully.');
    } catch (err) {
      setError('Unable to add user.');
    }
  }

  async function handleEditUser(formData) {
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      };

      const response = await updateUser(selectedUser.id, payload);
      const updatedUser = {
        ...response.data,
        firstName: formData.firstName,
        lastName: formData.lastName,
        department: selectedUser.department,
      };

      setUsers((currentUsers) =>
        currentUsers.map((user) => (user.id === selectedUser.id ? updatedUser : user)),
      );
      setIsModalOpen(false);
      setSelectedUser(null);
      setError('');
      setToastMessage('User updated successfully.');
    } catch (err) {
      setError('Unable to update user.');
    }
  }

  async function handleDeleteUser(userId) {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(userId);
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
      setError('');
      setToastMessage('User deleted successfully.');
    } catch (err) {
      setError('Unable to delete user.');
    }
  }

  function openEditModal(user) {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedUser(null);
  }

  const filteredUsers = users.filter((user) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query);

    const matchesFirstName = !filters.firstName || user.firstName.toLowerCase().includes(filters.firstName.toLowerCase());
    const matchesLastName = !filters.lastName || user.lastName.toLowerCase().includes(filters.lastName.toLowerCase());
    const matchesEmail = !filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase());
    const matchesDepartment = !filters.department || user.department.toLowerCase() === filters.department.toLowerCase();

    return matchesSearch && matchesFirstName && matchesLastName && matchesEmail && matchesDepartment;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortConfig.key]?.toLowerCase() || '';
    const bValue = b[sortConfig.key]?.toLowerCase() || '';

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }

    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }

    return 0;
  });

  function handleSort(key) {
    setSortConfig((currentConfig) => ({
      key,
      direction: currentConfig.key === key && currentConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortConfig, pageSize]);

  return (
    <Layout title="User Management Dashboard">
      <section>
        <div className="hero-section">
          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-icon" aria-hidden="true">👥</div>
              <div className="hero-text">
                <h2 className="hero-title">User Management Dashboard</h2>
                <p className="hero-subtitle">Manage, organize and monitor all users in one place.</p>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-illustration" aria-hidden="true">
                <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="20" width="80" height="80" rx="12" fill="#EAF0FF" />
                  <rect x="60" y="10" width="130" height="40" rx="8" fill="#F3F6FF" />
                  <circle cx="150" cy="90" r="22" fill="#E7EEFF" />
                  <rect x="30" y="60" width="60" height="12" rx="6" fill="#DCE8FF" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="action-card">
          <div className="action-left">
            <button type="button" className="primary-btn large" onClick={() => setIsModalOpen(true)}>
              Add User
            </button>
            <button type="button" className="white-btn large" onClick={() => setIsFilterOpen(true)}>
              Filter
            </button>
          </div>

          <div className="action-center">
            <SearchBar value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
          </div>

          <div className="action-right">
            <button type="button" className="nav-btn active">All Users</button>
            <button type="button" className="nav-btn">Analytics</button>
          </div>
        </div>

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <>
            {sortedUsers.length === 0 ? (
              <div className="empty-state">No users match the current filters.</div>
            ) : (
              <>
                <UserTable
                  users={paginatedUsers}
                  onEdit={openEditModal}
                  onDelete={handleDeleteUser}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={setPageSize}
                />
              </>
            )}
          </>
        )}
      </section>

      <FilterPopup
        isOpen={isFilterOpen}
        filters={filters}
        onChange={setFilters}
        onClose={() => setIsFilterOpen(false)}
        onReset={() => setFilters({ firstName: '', lastName: '', email: '', department: '' })}
      />

      <Modal isOpen={isModalOpen} title={selectedUser ? 'Edit User' : 'Add User'} onClose={closeModal}>
        <UserForm
          initialValues={selectedUser ? {
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            email: selectedUser.email,
          } : undefined}
          onSubmit={selectedUser ? handleEditUser : handleAddUser}
          onCancel={closeModal}
        />
      </Modal>

      {toastMessage && <div className="toast">{toastMessage}</div>}
    </Layout>
  );
}

export default DashboardPage;
