import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="flex h-full max-w-52 flex-col justify-between">
      <div>
        <h1 className="mb-8 text-5xl font-semibold text-white">pulse</h1>

        <div className="space-y-5">
          <div className="flex items-center space-x-3 text-white">
            <Image
              src="/icons/home.svg"
              alt="home"
              width={22}
              height={22}
              className="cursor-pointer"
            />
            <span className="cursor-pointer text-lg font-medium">home</span>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <Image
              src="/icons/search.svg"
              alt="search"
              width={22}
              height={22}
              className="cursor-pointer"
            />
            <span className="cursor-pointer text-lg">search</span>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <Image
              src="/icons/notifications.svg"
              alt="notifications"
              width={22}
              height={22}
              className="cursor-pointer"
            />
            <span className="cursor-pointer text-lg">notifications</span>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <Image
              src="/icons/upload.svg"
              alt="upload"
              width={22}
              height={22}
              className="cursor-pointer"
            />
            <span className="cursor-pointer text-lg">upload</span>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <Image
              src="/icons/user.jpeg"
              alt="profile"
              height={22}
              width={22}
              className="cursor-pointer rounded-4xl"
            />
            <span className="cursor-pointer text-lg">profile</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 text-white">
        <Image
          src="/icons/settings.svg"
          alt="more"
          height={22}
          width={22}
          className="cursor-pointer"
        />
        <span className="cursor-pointer text-lg">more</span>
      </div>
    </div>
  );
};

export default Sidebar;
