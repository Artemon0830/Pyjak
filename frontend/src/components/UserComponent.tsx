import { IUser } from '@/redux/features/users/users.types';
import React, { FC} from 'react';

type IProps = {
  user: IUser;
};

const UserComponent: FC<IProps> = ({ user }) => {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>

      {user.avatar && (
        <img
          src={`${import.meta.env.VITE_MINIO_PUBLIC_URL}/photos/${user.avatar}`}
          alt={user.name}
          width={200}
        />
      )}

      <p>Email: {user.email}</p>

      {user.phone && <p>Phone: {user.phone}</p>}

      <p>Role: {user.role}</p>

      <p>
        Verified:
        {user.isVerified ? ' ✅' : ' ❌'}
      </p>

      <p>
        Status:
        {user.isDeleted ? ' Deleted' : ' Active'}
      </p>

      <p>{user.description}</p>

      {user.companyName && (
        <>
          <h3>Company</h3>
          <p>{user.companyName}</p>
        </>
      )}

      {user.website && (
        <p>
          Website:{' '}
          <a
            href={user.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.website}
          </a>
        </p>
      )}

      {user.businessPhones?.length ? (
        <>
          <h3>Business phones</h3>
          <ul>
            {user.businessPhones.map(phone => (
              <li key={phone}>{phone}</li>
            ))}
          </ul>
        </>
      ) : null}

      {user.businessAddress && (
        <>
          <h3>Business address</h3>
          <ul>
            <li>Country: {user.businessAddress.country}</li>
            <li>City: {user.businessAddress.city}</li>
            <li>
              Street: {user.businessAddress.street}{' '}
              {user.businessAddress.buildingNumber}
            </li>
            {user.businessAddress.office && (
              <li>Office: {user.businessAddress.office}</li>
            )}
            {user.businessAddress.zipCode && (
              <li>ZIP: {user.businessAddress.zipCode}</li>
            )}
          </ul>
        </>
      )}

      {user.favorites?.length ? (
        <>
          <h3>Favorite places</h3>
          <ul>
            {user.favorites.map(place => (
              <li key={place._id}>
                {place.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No favorite places yet.</p>
      )}
    </div>
  );
};

export default UserComponent;