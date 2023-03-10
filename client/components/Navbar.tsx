import { Key } from "react";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { BiShoppingBag } from "react-icons/bi";
import {
  IoMdNotificationsOutline,
  IoIosLogOut,
  IoMdClose,
} from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../store/authSlice";
import { useState } from "react";
import Image from "next/image";
import { GET_FOODS } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { FoodInterface } from "../typescript/interfaces";
import { RootState } from "../store";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const { data } = useQuery(GET_FOODS);
  const cartCounter = useSelector((state: RootState) => state.cart.counter);
  const checkUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authUser({ user: false, email: null }));
  };

  return (
    <nav className="w-full h-16 xs:h-20 flex flex-row items-center">
      <form className="flex justify-start ml-5 xs:ml-10 mmd:ml-80 relative">
        <input
          type="text"
          value={query}
          placeholder="Search..."
          className="bg-theme-dark-black w-[220px] xs:w-[350px] h-8 xs:h-10 rounded-full text-theme-light-grey pl-6 pr-10 py-2 outline-none placeholder:italic placeholder:text-theme-light-grey placeholder-pl-2 text-sm xs:text-base"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <span className="text-white absolute top-1/2 -translate-y-1/2 right-3 text-lg xs:text-2xl">
          {query ? (
            <IoMdClose
              className="cursor-pointer"
              onClick={() => setQuery("")}
            />
          ) : (
            <BsSearch />
          )}
        </span>

        {query.length > 2 && (
          <div className="search border border-theme-light-grey text-white absolute top-full mt-1 z-10 w-full max-h-[380px] overflow-y-auto rounded-2xl bg-theme-dark-black flex flex-col justify-between gap-3 py-3">
            {/* product */}
            {data?.getFoods
              ?.filter((food: FoodInterface) =>
                food.title.toLowerCase().includes(query)
              )
              .map((food: FoodInterface, i: Key) => (
                <Link
                  key={i}
                  href={`/food/${food.id}`}
                  className="bg-theme-light-grey p-3 rounded-[30px] flex items-center gap-3 mx-3"
                  onClick={() => setQuery("")}
                >
                  <Image
                    src={food.image as string}
                    width={50}
                    height={50}
                    alt="cart product"
                    className="object-cover object-center drop-shadow w-auto h-auto"
                  />
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-center gap-y-2">
                    <div className="flex-2">
                      <h3 className="capitalize font-medium mb-1 text-xs xs:text-[15px]">
                        {food.title}
                      </h3>
                      <div className="flex flex-row flex-wrap">
                        {food.ingredients.length > 5 ? (
                          <p className="text-theme-dark-grey2 text-[10px] xs:text-[13px] font-medium leading-2">
                            {food.ingredients
                              .slice(0, 5)
                              .join(", ")
                              .concat("...")}
                          </p>
                        ) : (
                          <p className="text-theme-dark-grey2 text-[10px] xs:text-[13px] font-medium leading-2">
                            {food.ingredients.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>

                    <h2 className="flex-1 text-2xl xs:text-[28px] font-bold leading-none text-end">
                      {`$${food.price}`}
                    </h2>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </form>

      <div className="flex-1 flex justify-end gap-x-2 mr-5 xs:mr-10">
        <button className="hidden xs:block bg-theme-dark-grey text-white text-xl p-3 rounded-full">
          <IoMdNotificationsOutline />
        </button>
        <Link
          href="/cart"
          className="ml-2 xs:ml-0 bg-theme-dark-grey text-white text-lg xs:text-xl p-2 xs:p-3 rounded-full relative"
        >
          <BiShoppingBag />
          <span className="flex justify-center items-center font-medium text-xs xs:text-sm w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-theme-light-orange absolute -bottom-2 -right-1">
            {cartCounter}
          </span>
        </Link>
        <Link
          href="/login"
          className={`${
            checkUser ? "bg-theme-light-orange" : "bg-theme-dark-grey"
          } text-white text-lg xs:text-xl p-2 xs:p-3 rounded-full`}
        >
          {checkUser ? (
            <IoIosLogOut onClick={handleLogout} />
          ) : (
            <AiOutlineUser />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
