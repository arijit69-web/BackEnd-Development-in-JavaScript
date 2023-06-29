# BASIC BOOKING FLIGHTs LOGIC
- [VIDEO](https://drive.google.com/file/d/1xeyCwaqdSSgzaicSLN__ylYWFEaCRyiz/view?usp=drive_link)

# BOOKING FLIGHTs MECHANISM

## Problems:

### 1. Same Seat Selection

### 2. There are two concurrent bookings for one seat
- The Booking Mechanism depends on payments. 
- When u are playing with someone's payments u have to be very careful.
- The same seat has been selected by two users, but neither has started the booking process.
- As soon as both users started the booking process.
- The request which reaches the server first with milli/micro/nano seconds difference gets blocked for 10 mins and block key is sent back. [Dependent on network speed]
- Other requests get block fail response.
- Successful request has 10 mins to book the ticket using the block key.
- We need to complete payment, booking confirmation and user notifications like email and sms with in 10 mins.
- After 10 minutes ticket is released to all if the ticket is not confirmed.


### 3. During the processing of the payment request/response, the payment fails, etc.

</br>

>In Booking Systems,  there can be multiple cases of  Race Conditions.

To handle these kinds of race conditions we can implement 2 different kinds of mechanisms. 

- Pessimistic Concurrency Control

- Optimistic Concurrency Control 

In our Booking Flights System we are going to use:

- Optimistic Concurrency Control [Manual Checks]

- Pessimistic Concurrency Control [Serializable Isolation Level]