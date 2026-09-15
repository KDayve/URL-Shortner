

def deposit(balance, total_deposits, transaction):

  while True:
      try:
        amount = float(input("How much do you want to deposit: $"))
        print()

        if amount <= 0:
         print("Invalid amount,try again")

        else:
           print(f"Starting balance: ${balance:.2f}")
           print(f"Deposit: ${amount:.2f}")
           print("-" * 31)

           balance += amount
           total_deposits += amount

           transaction.append(f"Deposit: +${amount:.2f}\nBalance: ${balance:.2f}")

           print(f"New balance: ${balance:.2f}")
           print()
           print("Deposit successful!")
           input("Press ENTER to return to menu...")  
           return balance, total_deposits, transaction
      except ValueError:
          print("Please enter a valid number.")  
      
      

def withdraw (balance, total_withdrawals, transaction):
   while True: 
    try:
         print(f"Starting balance: ${balance:.2f}")
         
         withdrawal = float(input("Withdrawal: $")) 
         if withdrawal == 0:
             print("Withdrawal cancelled.")
             input("Press ENTER to return to menu...")
             break  
         elif withdrawal > balance:
             print("Insufficient funds!,please try again")
            
         elif withdrawal < 0:
             print("Invalid input!")   
         else:
             balance -= withdrawal
             total_withdrawals += withdrawal
             transaction.append(f"Withdrawal: -${withdrawal:.2f}\nBalance: ${balance:.2f}")
             print()
             print("-" * 31)
             print(f"New balance: ${balance:.2f}")
             input("Press ENTER to return to menu...")
             break
         return balance, total_withdrawals, transaction
    except ValueError:
      print("Please enter a valid number.")
         

  

def transfers(balance,total_transfers,transaction):
          print("-" * 12 + "TRANSFER" + "-" * 12)
          recipient_number = input("Recipient:") 
          while True:
            try:
                transfer_amount = int(input("Transfer amount: $"))
                if transfer_amount == 0:
                    print("Transfer cancelled.")
                    input("Press ENTER to return to menu...")
                    break  
                elif transfer_amount < 0:
                    print("Invalid input,try again") 
                elif transfer_amount > balance:
                    print("Insufficient funds!")
                    input("Press ENTER to return to menu...")
                    break
                else:    
                    balance -= transfer_amount
                    total_transfers += transfer_amount
                    transaction.append(f"Transfer: ${transfer_amount:.2f}\nBalance: ${balance:.2f}")
                    print("-" * 31)
                    print()
                    print("Transfer successful!")
                    print(f"New balance: ${balance:.2f}")
                    input("Press ENTER to return to menu...")
                    break 
            except ValueError:
                print("Please enter a valid number.")
          return balance,total_transfers,transaction  