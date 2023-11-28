import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';

export async function getUser() {
  console.log({ cookies: cookies().toString() });
  const res = await fetch(`http://localhost:3000/api/auth/login`, {
    headers: { Cookie: cookies().toString() }
  });
  const data = await res.json();
  console.log({ data });
  if (res.ok) {
    return data;
  } else {
    redirect('/login?alert=You are not logged in');
  }
}

const ProfilePage = async () => {
  const { user } = await getUser();
  const { id, firstName, lastName, displayImg } = user;
  return (
    <div className='min-h-[75vh] max-w-lg mx-auto bg-white rounded-lg md:shadow-md text-black py-12 my-8 px-3 flex gap-11 flex-col md:px-16 justify-center'>
      <div className='flex flex-col gap-3'>
        {/* TODO: Tips on hiw to get an effective add */}
        <h2 className='text-secondary text-3xl font-bold text-center mb-5'>
          Your Profile
        </h2>
        <div className='flex gap-2 flex-col items-center justify-center mb-9'>
          <div className='w-28 h-28 rounded-full border-solid border-2 border-secondary shadow-lg bg-gray-100 flex items-center justify-center'>
            {displayImg !== 'null' && displayImg ? (
              <Image
                src={displayImg}
                alt='new display picture'
                className='h-full w-full object-cover rounded-full'
                width={112}
                height={112}
              />
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-14 h-14'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                />
              </svg>
            )}
          </div>
          <p className='text-lg font-semibold'>{`${firstName} ${lastName}`}</p>
        </div>
        <Link
          href={'#'}
          className='w-full p-3 bg-gray-100 rounded-lg hover:bg-loadingSecondary transition-all hover:transition-all custom-shadow'>
          <p>My Adverts</p>
        </Link>
        <Link
          href={'/profile/edit'}
          className='w-full p-3 bg-gray-100 rounded-lg hover:bg-loadingSecondary transition-all hover:transition-all custom-shadow'>
          <p>Edit Profile</p>
        </Link>
        <Link
          href={'/profile/edit-password'}
          className='w-full p-3 bg-gray-100 rounded-lg hover:bg-loadingSecondary transition-all hover:transition-all custom-shadow'>
          <p>Change Password</p>
        </Link>
        <Link
          href={'#'}
          className='w-full p-3 bg-gray-100 rounded-lg hover:bg-loadingSecondary transition-all hover:transition-all custom-shadow'>
          <p>Notifications</p>
        </Link>
        <Link
          href={'#'}
          className='w-full p-3 bg-gray-100 rounded-lg hover:bg-loadingSecondary transition-all hover:transition-all custom-shadow'>
          <p>Performance</p>
        </Link>
        <Link
          href={'#'}
          className='w-full p-3 bg-gray-100 rounded-lg hover:bg-loadingSecondary transition-all hover:transition-all custom-shadow'>
          <p>Wallet</p>
        </Link>
        <Link
          href={'#'}
          className='w-full p-3 bg-gray-100 rounded-lg hover:bg-loadingSecondary transition-all hover:transition-all custom-shadow'>
          <p>Transactions</p>
        </Link>
        <Link
          href={'/signout'}
          className='flex mt-5 gap-1 py-2 px-5 rounded-lg shadow-md bg-secondary text-white w-max m-auto'>
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
