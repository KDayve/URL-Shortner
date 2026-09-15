print("Welcome to Dave's coffee shop")
print()
print("Menu:")
print("1. Coffee - $5")
print("2. Tea - $3")
print("3. Hot Chocolate - $4")


while True:
    choice = int(input("What would you like? "))



    if choice == 1:
      print("You selected Coffee. ")
      item = "Coffee"
      price = 5
      break

    elif choice == 2:
      print("You selected Tea.")
      item = "Tea"
      price = 3
      break

    elif choice == 3:
      print("You selected Hot Chocolate. ")
      item = "Hot Chocolate"
      price = 4
      break

    else:
      print("Invalid choice.Please choose 1,2 or 3. ")
 


#quantity
while True:
  quantity = int(input("How many would you like? "))

  if quantity > 0:
    break
  else:
    print("Invalid quantity. Please enter a number greater than 0.")
total = price * quantity
print(f"Your total is: ${total:.2f} ")
while True:
  payment = float(input("How much are you paying? $"))
  if payment >= total:
    break
  else:
    print(f"Not enough money. You need at least ${total}") 


change = payment - total
print(f"Your change is: ${change:.2f}")
print()

border = "-" * 27
print(border)
print("RECEIPT".center(27))
print(border)
print(f"Item: {item}")
print(f"Price: ${price}")
print(f"Quantity: {quantity}")
print(f"Total: ${total}")
print(f"Payment: {payment}")
print(f"Change: {change}")
print(border)
print("Thank you for your purchase!")