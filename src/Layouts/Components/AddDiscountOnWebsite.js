import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AddDiscountOnWebsiteDetails,
  EditWebsiteDiscounts,
} from "../../Redux/actions/users";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/global.css";

const AddDiscountOnWebsite = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userType } = location.state;
  const { userData } = location.state;

  const loginDetails = useSelector(
    (state) => state.auth?.userDetailsAfterLogin.Details
  );

  const [usedCoupons, setusedCoupons] = useState([]);
  const [remainingCoupons, setremainingCoupons] = useState("");

  const [discountTitle, setDiscountTitle] = useState(
    userData?.DiscountTitle ? userData?.DiscountTitle : ""
  );
  const [discountAmount, setDiscountAmount] = useState(
    userData?.Discount ? userData?.Discount : ""
  );
  const [startDate, setstartDate] = useState(
    userData?.StartDate ? userData?.StartDate : ""
  );
  const [endDate, setendDate] = useState(
    userData?.EndDate ? userData?.EndDate : ""
  );

  const onsubmit = () => {
    if (
      discountTitle == "" ||
      discountAmount == "" ||
      startDate == "" ||
      endDate == ""
    ) {
      toast.warning("Please fill all the fields");
    } else {
      const data = {
        discountTitle: discountTitle,
        discountAmount: discountAmount,
        StartDate: startDate,
        EndDate: endDate,
        IsActive: 1,
        isDiscountEnabled: 1,
      };

      dispatch(
        AddDiscountOnWebsiteDetails(
          data,
          loginDetails?.logindata?.Token,
          (callback) => {
            if (callback.status) {
              toast.success("Discount Added");
              navigate(-1);
              toast.error(callback.error);
            } else {
              toast.error(callback.error);
            }
          }
        )
      );
    }
  };

  const onEditCoupon = () => {
    if (
      discountTitle == "" ||
      discountAmount == "" ||
      startDate == "" ||
      endDate == ""
    ) {
      toast.warning("Please fill all the fields");
    } else {
      const data = {
        discountId: userData?.Id,
        discountRef: userData?.Ref,
        discountTitle: discountTitle,
        discountAmount: discountAmount,
        StartDate: startDate,
        EndDate: endDate,
        IsActive: 1,
        isDiscountEnabled: 1,
      };

      dispatch(
        EditWebsiteDiscounts(
          data,
          loginDetails?.logindata?.Token,
          (callback) => {
            if (callback.status) {
              toast.success("Website Discounts Edited");
              navigate(-1);
              toast.error(callback.error);
            } else {
              toast.error(callback.error);
            }
          }
        )
      );
    }
  };

  return (
    <div>
      {" "}
      <ToastContainer />{" "}
      <div className="row">
        <h3 className="mb-4">Add Website Discount</h3>
        <div className="col-lg-6 mt-3 mt-3">
          <label for="formGroupExampleInput " className="form_text">
            Discount Title
          </label>
          <input
            class="form-control mt-2 "
            type="text"
            placeholder="Discount Title"
            onChange={(e) => setDiscountTitle(e.target.value)}
            defaultValue={userData?.DiscountTitle}
          />
        </div>
        <div className="col-lg-6 mt-3">
          <label
            for="formGroupExampleInput "
            className="form_text"
            style={{ fontSize: "15px", fontWeight: "600" }}
          >
            Discount Amount
          </label>
          <input
            class="form-control mt-2"
            type="number"
            placeholder="Enter Discount Amount"
            onChange={(e) => setDiscountAmount(e.target.value)}
            defaultValue={userData?.Discount}
          />
        </div>

        <div className="col-lg-6 mt-3">
          <label for="formGroupExampleInput " className="form_text">
            Start Date
          </label>
          <input
            class="form-control mt-2"
            type="date"
            placeholder="Enter Start Date"
            onChange={(e) => setstartDate(e.target.value)}
            defaultValue={userData?.StartDate}
          />
        </div>
        <div className="col-lg-6 mt-3">
          <label for="formGroupExampleInput " className="form_text">
            End Date
          </label>
          <input
            class="form-control mt-2"
            type="date"
            placeholder="End Date"
            onChange={(e) => setendDate(e.target.value)}
            defaultValue={userData?.EndDate}
          />
        </div>

        {!userData ? (
          <div className="mt-5">
            <button onClick={onsubmit} className="btn btn-primary">
              Add Website Discount
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <button onClick={onEditCoupon} className="btn btn-primary">
              Edit Website Discount
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDiscountOnWebsite;
