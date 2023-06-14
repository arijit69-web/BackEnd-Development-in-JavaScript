# Transaction in DBMS

### What is a DB Transaction?

In real-life situations, we might need to execute a series of queries in order to accomplish a task. We might do a club of CRUD operations in order to accomplish a task. These series of operations can execute a single unit of work based on our product and hence these series of operations are called DB Transactions.

Now during the transaction execution, our DB might go through a lot of changes & can be in an inconsistent intermediate state.

Our DB should not be in an inconsistent state.

**Transaction States in DBMS**
During the lifetime of a transaction, there are a lot of states to go through. These states update the operating system about the current state of the transaction and also tell the user about how to plan further processing of the transaction. These states decide the regulations which decide the fate of a transaction whether it will commit or abort.

The ROLLBACK statement undo the changes made by the current transaction. A transaction cannot undo changes after COMMIT execution.

Following are the different types of transaction States :

Active State: When the operations of a transaction are running then the transaction is said to be active state. If all the read and write operations are performed without any error then it progresses to the partially committed state, if somehow any operation fails, then it goes to a state known as failed state.

Partially Committed: After all the read and write operations are completed, the changes which were previously made in the main memory are now made permanent in the database, after which the state will progress to committed state but in case of a failure it will go to the failed state.

Failed State: If any operation during the transaction fails due to some software or hardware issues, then it goes to the failed state . The occurrence of a failure during a transaction makes a permanent change to data in the database. The changes made into the local memory data are rolled back to the previous consistent state.

Aborted State: If the transaction fails during its execution, it goes from failed state to aborted state and because in the previous states all the changes were only made in the main memory, these uncommitted changes are either deleted or rolled back. The transaction at this point can restart and start afresh from the active state.

Committed State: If the transaction completes all sets of operations successfully, all the changes made during the partially committed state are permanently stored and the transaction is stated to be completed, thus the transaction can progress to finally get terminated in the terminated state.

Terminated State: If the transaction gets aborted after roll-back or the transaction comes from the committed state, then the database comes to a consistent state and is ready for further new transactions since the previous transaction is now terminated.

<img src="./ss-1.PNG"  width="450" height="250">

Properties of Transaction in DBMS
There are four major properties that are vital for a transaction to be successful. These are used to maintain state consistency in the database, both before and after the transaction. These are called ACID properties.
- A - Atomicity
- C - Consistency
- I - Isolation
- D - Durability

## Atomicity

A transaction is a bundle of statements that intend to achieve one final state. When we are attempting a transaction, we either want to complete all the statements or none of them. We never want an intermediate state.

Eg. If Marino has an account namely A with $50 in it and wants to send $20 to Amanda who has an account namely B. An amount of $200 is already existing in account B. When $20 is deposited to account B, the total becomes $220.

Two procedures are now scheduled to take place. One is that the $20 that Marino wishes to send will be deducted from his account A and would be credited to account B, i.e., into Amanda's account. What happens now is that the initial debit operation succeeds, but the crediting operation fails.

As a result, the value in Marino's account A becomes 30$, while the value in Amanda's account remains $200 as it was earlier.
Therefore, this transaction is not an atomic transaction.

## Consistency

Data stored in a DB is always valid & in a consistent state.
This property means that the integrity constraints of a database are maintained so that the database is consistent before and after the transaction. It refers to the correctness of a database.

## Isolation

It is the ability of multiple transactions to execute without interfering with one another.  If 2 transactions run and start parallelly we don't want them to affect each other.
Read process -> What is the account balance?
Write process -> Update the account balance from 500 -> 700
So which ever comes first will do that operation. Read and Write operation doesnot know about each other.

Eg. Write process -> Update the account balance from 500 -> 700.
Read process -> What is the account balance?
But somehow the Write process failed to update the account balance from 500 -> 700.
But the Read process executed successfully and read the old previous data i.e.500 from the DB as the Write process execution failed.

This property means that multiple transactions can occur concurrently without causing any inconsistency to the database state. These transactions occur independently without any external interference. Changes that occur in a particular transaction are not visible/ accessible to any other transaction until that particular change in that transaction has been committed.


## Durability

If something changed in the DB and any unforeseen circumstances happened then our changes should persist. This property ensures that once the transaction has completed execution, the updates and modifications to the database are stored in and written to disk and they remain intact even if a system failure occurs. These updates become permanent and are stored in the non-volatile memory.

# ACID Properties in DBMS [Detailed Explanation]

## 1. Atomicity in DBMS
The term atomicity is the ACID Property in DBMS that refers to the fact that the data is kept atomic. It means that if any operation on the data is conducted, it should either be executed completely or not at all. It also implies that the operation should not be interrupted or just half completed. When performing operations on a transaction, the operation should be completed totally rather than partially. If any of the operations aren’t completed fully, the transaction gets aborted.
Sometimes, a current operation will be running and then, an operation with a higher priority enters. This discontinues the current operation and the current operation will be aborted.

In the example above, if we consider the case that both users get notified that the seat is booked and neither of them is allowed to be seated because only one seat is available on the train, that is a half-fulfilled transaction. The transaction would be complete if they were able to be seated as well. Instead, according to atomicity, the person who clicks the button first books the seat and gets the notification of having purchased a ticket, and the seats left are updated. The second person’s transaction is rolled back and they are notified that no more seats are available. Let us consider an easier example where one person is trying to book a ticket. They were able to select their seat and reach the payment gateway. But, due to bank server issues, the payment could not go through. Does this mean that their booked seat will be reserved for them?
No. This is because one full transaction means reserving your seat and paying for it as well. If any of the steps fail, the operation will be aborted and you will be brought back to the initial state.

Atomicity in DBMS is often referred to as the ‘all or nothing’ rule.

## 2. Consistency in DBMS
This ACID Property will verify the total sum of seats left in the train+sum of seats booked by users=total the number of seats present in the train. After each transaction, consistency is checked to ensure nothing has gone wrong.

Let us consider an example where one person is trying to book a ticket. They are able to reserve their seat but their payment hasn’t gone through due to bank issues. In this case, their transaction is rolled back. But just doing that isn’t sufficient. The number of available seats must also be updated. Otherwise, if it isn’t updated, there will be an inconsistency where the seat given up by the person is not accounted for. Hence, the total sum of seats left in the train + the sum of seats booked by users would not be equal to the total number of seats present in the train if not for consistency.

## 3. Isolation in DBMS
Isolation is defined as a state of separation. Isolation is an ACID Property in DBMS where no data from one database should impact the other and where many transactions can take place at the same time. In other words, when the operation on the first state of the database is finished, the process on the second state of the database should begin. It indicates that if two actions are conducted on two different databases, the value of one database may not be affected by the value of the other. When two or more transactions occur at the same time in the case of transactions, consistency should be maintained. Any modifications made in one transaction will not be visible to other transactions until the change is committed to the memory.

Let us use our example of 2 people trying to book the same seat to understand this ACID Property. Two transactions are happening at the same item on the same database, but in isolation. To ensure that one transaction doesn’t affect the other, they are serialized by the system. This is done so as to maintain the data in a consistent state. Let us consider that the two people that click ‘Book Now’, do so with a gap of a few seconds. In that case, the first person’s transaction goes through and he/she receives their ticket as well. The second person will not know of the same until the first person’s transaction is committed to memory. When the second person clicks on ‘Book Now’ and is redirected to the payment gateway, since the first person’s seat has already been booked, it will show an error notifying the user that no seats are left on the train.

## 4. Durability in DBMS
The ACID Property durability in DBMS refers to the fact that if an operation is completed successfully, the database remains permanent in the disk. The database’s durability should be such that even if the system fails or crashes, the database will survive. However, if the database is lost, the recovery manager is responsible for guaranteeing the database’s long-term viability. Every time we make a change, we must use the COMMIT command to commit the values.

Imagine a system failure or crash occurs in the railway management system and all the trains that everyone had booked have been removed from the system. That means millions of users would have paid the money for their seats but will not be able to board the train as all the details have been destroyed. This could lead to huge losses for the company as users would lose trust in them. In addition, it would create a lot of panics as these trains would be needed for important reasons as well.

</br>

>Transactions are nothing but a set of Read and Write operations.

</br>


# 3 Different Types of Read Write Conflict in DBMS 

### How does Data Conflict Occur in DBMS?
Data is saved into the database. And to fetch and write data from the database, you need to perform read and write operation on the data.

There are multiple entities (multiple users, multiple APPs, multiple websites…) performing these multiple operations on the same data at the same time.

<img src="./ss-2.png"  width="450" height="250">


Just as an instance, there is a centralized banking database where all the information about the users and the bank related information is saved.

There might be multiple user logins to their bank account and access the same bank information at the same time. They perform various operations like reading or updating or deleting the data.

So basically there are two types of operations that can be performed on the database.

**1. Read operation:**
Read the data value from the database. It is a safe operation, as it does not update any information in the database.

**2. Write operation:**
It writes data into the database and saved it for further use. After writing data, data has to be committed (Commit Operation) to making updated information available for further operations. This operation is more prone to vulnerability as it involves modifying database information.

For a data update operation, it involves both the reading and writing operation.

**What is Transaction in Database?**
The set of these multiple operations/instruction (to accomplish a particular task) are performed on the data. This set is called as Transaction.

Every entity accessing data holds different transaction and all the transactions execute simultaneously.

The operations involved in the successful Transaction:

- Read the data
- Modify read data values
- Write the data back
- Commit the transaction

While performing these operations by the different users on the same data at the same time may arise data conflict. As like, accessing data by one transaction before committing another transaction does not hold good and gives data conflict.

There are different types of data conflict happens during reading and writing operations called as “Read-Write conflict”.

## Different Types of Read Write Conflict in DBMS:

As I mentioned it earlier, the read operation is safe as it does modify any information. So, there is no Read-Read (RR) conflict in the database.

Any number of transactions are free to read the same data (without conflict) anytime as long as there is no write operation.

So, there are three types of conflict in the database transaction.

- Write-Read (WR) conflict
- Read-Write (RW) conflict
- Write-Write (WW) conflict

Let’s see one-by-one with the example.

### What is Write-Read (WR) conflict?
This conflict occurs when a transaction read the data which is written by the other transaction before committing.

In the following diagram, I am using the following notions

```
A, B - two different data objects from database

T1, T2 - two different transactions

R(A) - reading data A

W(A) - writing data A

Com. - committing transaction
```

<img src="./ss-3.png"  width="380" height="250">

Here, the transaction T2 is reading the data which is written by the T1 before T2 commits. It is also called as Dirty Read.

It violates the ACID property of data consistency rule.

Expected behavior:

The new transaction (says T2) should not read the value if any other another transaction (say T1) already has written the data and has not committed.

### What is Read-Write (RW) conflict?

<img src="./ss-4.png"  width="380" height="250">

Transaction T2 is Writing data which is previously read by transaction T1.

Here if you look at the diagram above, data read by transaction T1 before and after T2 commits is different.

Example:

Suppose Alice and Bob want to book the flight for their vacation. Alice open airlines website to check the availability and cost of the ticket. There is only one ticket is available. Alice finds it expensive and looks for other airlines fares if she gets any offers.

Meanwhile, Bob logins to the same airline portal and book the ticket. Now, there is no more flight ticket available.

Alice does not find any good offer on other airlines portal, she comes back to the previous airline portal. And tried to book a flight ticket even it is not available. Its Conflict, Read-Write (WR) conflict.

### What is Write-Write (WW) conflict?

<img src="./ss-5.png"  width="380" height="250">

Here Transaction T2 is writing data which is already written by other transaction T1. T2 overwrites the data written by T1. It is also called as a blind write operation.

Data written by T1 has vanished. So it is data update loss.

Example:

Alice and Bob share common Google-sheet online. Both read the file. Alice updates the document and forgets to save the file. On another end, Bob updates the Google sheet and save the file.

The content updated by Alice is overwritten by Bob. The data updated by Alice is lost. It is called as Write-Write (WW) conflict.

# Transaction in DBMS Example
- [VIDEO](https://drive.google.com/file/d/1ypGo-hYA6f1iM421rfdp5nl3OnDvC9Yy/view?usp=drive_link)