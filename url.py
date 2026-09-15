import random
import string

print("Welcome to the URL Shortener!")
name = input("What is your name? ")
print()
print("What will you like to do?")
print("1. Create a short URL")
print("2. Visit a short URL")
print("3. Exit")
choice = input("Enter choice: ")
if choice == "1":
  long_url = input("Enter the long URL: ")
  
  answer = input("Would you like a custom short code?(Y/N): ")

  if answer == "Y":
    characters = string.ascii_letters + string.digits
    short_code = "".join(random.choices(characters,k=6))
    print(f"Your short URL is: {short_code}")
    print("Original has been saved")
  elif answer == "N":
    print("Thank you for visiting URL Shortener")
else:
