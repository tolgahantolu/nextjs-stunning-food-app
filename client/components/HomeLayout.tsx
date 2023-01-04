import React, { Key } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_FOODS } from "../graphql/query";
import Food from "./Food";
import PromotionalKit from "./PromotionalKit";

import { FiChevronRight } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import Category from "./Category";
import Loader from "./Loader";

const HomeLayout = () => {
  const {
    loading: foodsLoading,
    error: foodsError,
    data: foodsData,
  } = useQuery(GET_FOODS);
  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery(GET_CATEGORIES);

  if (categoriesLoading) return <Loader />;
  if (categoriesError) return <p>Error : {categoriesError.message}</p>;

  return (
    <section className="grid grid-cols-6 grid-rows-6 gap-x-10">
      <div className="w-full col-span-4">
        <div className="w-full h-full grid grid-cols-6 gap-4">
          {categoriesData?.getCategories?.map(
            (
              category: {
                id: Object;
                name: String;
                popular: Boolean;
              },
              i: Key
            ) => (
              <>
                {category.popular && (
                  <Category {...category} index={i} paddingBottom={false} />
                  //  <div
                  //    key={i}
                  //    className="w-full col-span-1 bg-theme-dark-grey px-3 rounded-[40px] transition duration-750 hover:bg-theme-light-grey"
                  //  >
                  //    <Link
                  //      href={`/category/${category.name}`}
                  //      className="flex flex-col items-center justify-center"
                  //    >
                  //      <Image
                  //        src="/category/cake.png"
                  //        alt="category"
                  //        width={75}
                  //        height={75}
                  //        className="py-2"
                  //      />
                  //      <p className="capitalize">{category.name}</p>
                  //    </Link>
                  //  </div>
                )}
              </>
            )
          )}
        </div>
      </div>

      {/* discount */}
      <div className="h-full col-span-2 mr-10 bg-theme-green rounded-[40px]">
        <div className="h-full flex justify-start items-center relative">
          <div className="pl-5">
            <Link
              href="/"
              className="mb-4 capitalize underline text-sm font-semibold flex items-center gap-x-1"
            >
              view details{" "}
              <span>
                <FiChevronRight />
              </span>
            </Link>
            <h1 className="text-2xl font-bold">-30% off</h1>
            <p className="text-lg">the best discount in the world</p>
          </div>
          <Image
            src="/food/discount.png"
            width={200}
            height={70}
            alt="sushi roll"
            className="absolute -top-5 -right-6 object-cover drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="w-full  mt-16 col-span-4 row-span-5">
        {/* heading */}
        <div className="flex flex-row justify-between items-center">
          <h1 className="capitalize text-2xl flex items-center gap-x-4">
            all items
            <button className="border-none outline-none text-lg bg-theme-dark-grey p-2 rounded-full cursor-pointer">
              <IoFilterSharp />
            </button>
          </h1>

          <Link
            href="/"
            className="green-view w-28 h-8 flex items-center rounded-full border-2 border-white relative"
          >
            <p className="capitalize text-sm pl-3">view all</p>
            <span className="text-2xl text-center p-[6px] rounded-full bg-theme-green absolute -right-[2px]">
              <FiChevronRight />
            </span>
          </Link>
        </div>

        {/* !!! products !!! */}
        <div className="w-full h-[540px] mt-5 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 pr-5">
            {/* product element */}
            {foodsData?.getFoods?.map(
              (
                food: {
                  id: Object;
                  title: String;
                  desc: String;
                  price: Number;
                  kit: Boolean;
                  category: String;
                  ingredients: Array<string>;
                },
                i: Key
              ) => (
                <Food {...food} index={i} />
              )
            )}
          </div>
        </div>
      </div>
      <div className="mt-16 col-span-2 row-span-5 mr-10">
        {/* heading */}
        <h1 className="capitalize text-2xl flex items-center gap-x-4">
          promotional kits
        </h1>

        {/* kit products */}
        <div className="w-full h-[540px] overflow-y-auto mt-5">
          <div className="flex flex-col gap-y-4 pr-5">
            {/* product */}
            {foodsData?.getFoods?.map(
              (
                food: {
                  title: String;
                  desc: String;
                  price: Number;
                  kit: Boolean;
                  ingredients: Array<string>;
                },
                i: Key
              ) => (
                <>{food.kit && <PromotionalKit {...food} key={i} />}</>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLayout;
