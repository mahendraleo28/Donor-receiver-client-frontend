import React, { useState } from 'react';
import "./App.css";
import { useEffect } from 'react';

const DonationForm = () => {
  const [donation, setDonation] = useState({
    donationType: '',
    comment: '',
    phonenumber: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    country: '',
    postalCode: '',
  });
  const [donations, setDonations] = useState([]);
  const [message, setMessage] = useState("")
  const reset=() => {
    setDonation({
      donationType: '',
      comment: '',
      phonenumber: '',
      addressLine1: '',
      addressLine2: '',
      state: '',
      country: '',
      postalCode: '',
    });
    setMessage('')
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonation({ ...donation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/send-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donation),
      });

      if (response.ok) {
        alert('Donation submitted successfully!')
        setMessage("Last Donation Successful")
        console.log('Donation submitted successfully!');
        // Reset the form after successful submission if needed
        setDonation({
          donationType: '',
          comment: '',
          phonenumber: '',
          addressLine1: '',
          addressLine2: '',
          state: '',
          country: '',
          postalCode: '',
        });
      } else {
        const errorData = await response.json();
        setMessage(`${errorData}`)
        alert('Failed to submit donation.')
        console.error('Failed to submit donation.');
      }
    } catch (error){
      alert('Error occurred while submitting donation:', error)
      console.error('Error occurred while submitting donation:', error);
      setMessage(`${error}`)
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/donations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`Donation with ID: ${id} deleted successfully!`);
        // Fetch donations again to update the list
      } else {
        alert('Failed to delete donation.');
      }
    } catch (error) {
      alert('Error occurred while deleting donation: ' + error);
      console.error('Error occurred while deleting donation:', error);
      setMessage(`${error}`)
    }
  };


  return (
    <div>
      <div>
      </div>
      <div className='overall-page-content'>
      <br />
      <br />
      <br />
      <br />
      <form className='form-tag-in-donor-page' onSubmit={handleSubmit}>
        <h1 className='Donor-page-heading'>Welcome to the Donor's Page</h1>
        <label>
          <select
            className='dropdown-for-donor-1st-dropdown'
            name="donationType"
            value={donation.donationType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type of donation</option>
            <option value="Clothes">Clothes</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
            <option value="Electronics">Electronics</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <div className='for-input-tags'>
        <textarea
            className='comment-tag-in-donor-page'
            type="textarea"
            name="comment"
            value={donation.comment}
            onChange={handleInputChange}
            placeholder="Please Type Here.... What You Are Donating"
            required
          />
          <input
            type="text"
            name="phonenumber"
            value={donation.phonenumber}
            onChange={handleInputChange}
            placeholder="Mobile number"
            required
          />
          <input
            type="text"
            name="addressLine1"
            value={donation.addressLine1}
            onChange={handleInputChange}
            placeholder="Address Line 1"
            required
          />
          <input
            type="text"
            name="addressLine2"
            value={donation.addressLine2}
            onChange={handleInputChange}
            placeholder="Address Line 2"
          />
          <input
            type="text"
            name="state"
            value={donation.state}
            onChange={handleInputChange}
            placeholder="State"
            required
          />
          <input
            type="text"
            name="country"
            value={donation.country}
            onChange={handleInputChange}
            placeholder="Country"
            required
          />
          <input
            type="number"
            name="postalCode"
            value={donation.postalCode}
            onChange={handleInputChange}
            placeholder="Postal Code"
            required
          />
        </div>
        <p className='This-is-for-errror-message'>{message}</p>
        <div className='for-both-buttons-in-donor-page'>
        <button className='submit-button-in-donor-page' type="submit">Submit Donation</button>
        <button onClick={reset} className='Reset-button-in-donr-page' type='reset'>Reset</button>
        </div>
        <br/>
      </form>
      </div>
      {/* <div className='this-is-for-table-data-in-donor-page'>
        <h4 className="donations-in-donor-page">All Donations</h4>
        <table className='table-in-receiver-page1'>
          <thead>
            <tr className="table-header-in-reciever-page">
              <th>ID</th>
              <th>Type</th>
              <th>Comment</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr className="table-data-in-reciever-page" key={donation.id}>
                <td>{donation.id}</td>
                <td>{donation.donationType}</td>
                <td>{donation.comment}</td>
                <td>{donation.phonenumber}</td>
                <td>{`${donation.addressLine1}, ${donation.addressLine2}, ${donation.state}, ${donation.country} - ${donation.postalCode}`}</td>
                <td>
                  <span
                    className='delete-button'
                    onClick={() => handleDelete(donation.id)}
                  >
                    Delete
                  </span>
                  <span className='delete-button'onClick={() => handleDelete(donation.id)}>
                    Update
                    </span >
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
        <br/>
        <br/>
        <br/>
      </div> */}
    </div>
  );
};

export default DonationForm;
