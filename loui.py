from functions import deposit
from functions import withdraw
from functions import transfers

border = "=" * 32
print(border)
print("DAVE BANKING SYSTEM".center(32))
print(border)


#PIN
while True:
  pin = input("Enter Pin: ")


  if pin == "1234":
      print("Login successful! Welcome, Dave.")
      break
  else:
     print("Wrong pin!")
     print("Try again")
print()



balance = 0
transaction = []
total_deposits = 0
total_withdrawals = 0
total_transfers = 0
while True:
  print()
  print("-" * 12 + "MENU" + "-" * 12)
  print("1. Check Balance")
  print("2. Deposit Money")
  print("3. Withdraw Money")
  print("4. Transfer Money")
  print("5. Transaction History")
  print("6. Mini Statement")
  print("7. Change pin")
  print("8. Exit")
  print()
  option = input("Choose an option: ")
  print()

 
  if option == "1":
    print("-" * 12 + "BALANCE" + "-" * 12)
    print(f"Your current balance is: ${balance:.2f}")
    print("-" * 31)
    input("Press ENTER to return to menu...")

  elif option == "2":
       balance, total_deposits, transaction = deposit(
          balance,
          total_deposits,
          transaction
       )

  elif option == "3":
   balance, total_withdrawals, transaction = withdraw(
     balance,
     total_withdrawals,
     transaction 
   )
      
  elif option == "4":
      balance,total_transfers,transaction = transfers(
         balance,
         total_transfers,
         transaction
      )
  elif option == "5":
      print("=" * 5 + "Transaction History" + "=" * 5)
      if len(transaction) == 0:
        print("You have no transaction history")
      else:
        for number, x in enumerate(transaction, start=1):
         print(number,x) 
        input("Press ENTER to return to menu...") 
  elif option == "6":
       print("=" * 5 + "Mini Statement" + "=" * 5)
       print(f"Total transactions: {len(transaction)}")     
       print(f"Current Balance: ${balance:.2f}")
       print(f"Total deposits: {total_deposits:.2f}")
       print(f"Total withdrawals: {total_withdrawals:.2f}")
       print(f"Total transfers: {total_transfers:.2f}") 
       input("Press ENTER to return to menu...") 
  elif option == "7":
       print("=" * 4 + "CHANGE PIN" + "=" * 4)
       old_pin = input("Enter your current PIN: ")
       if old_pin == pin:
          new_pin = input("Enter your new PIN: ")
          confirm_pin = input("Confirm your new PIN: ")
          if  new_pin == confirm_pin:
              pin = new_pin
              print("PIN changed successfully!")
          else:
             print("PINs do not match")   
       else:
          
          print("Incorrect PIN.")
          input("Press ENTER to return to menu...") 
  elif option == "8":
   print("-" * 12 + "EXIT" + "-" * 12)    
   print("Thank you for using our ATM.")
   print("Have a nice day!")
   print()
   print("Goodbye!")
   break