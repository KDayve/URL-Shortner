import random


print("Welcome to the Number Guessing Game!")
name = input("What is your name? ")
print()

while True:
  while True:
          print("Choose difficulty:")
          print("1. Easy (1 - 20)")
          print("2. Medium (1 - 50)")
          print("3. Hard (1 - 100)")




          choice = input("Enter choice: ")
          print()

          if choice == "1":
            print("I'm thinking of a number between 1 and 20")
            max_number = 20
            
                    
                
          elif choice == "2":
            print("I'm thinking of a number between 1 and 50")
            max_number = 50
            break  

          elif choice == "3":
            print("I'm thinking of a number between 1 and 100")
            max_number = 100
            break    

          else:
            print("Invalid choice,please enter a number 1, 2 or 3 only")
      
                

  secret_number = random.randint(1,max_number)
  print(f"I'm thinking of a number between (1 and {max_number})")
  guesses = []
  attempts = 0      

  while True:
            guess = int(input("Enter your guess: "))
            attempts += 1
            guesses.append(guess)

            if guess == secret_number:
              print("You guessed correctly")
              break
              
            elif guess > secret_number:
              print("Too high!")
            else:
              print("Too low!")