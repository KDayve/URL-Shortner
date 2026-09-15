import random
import string


urls = {}


while True:
    #menu
    print("=" * 22)
    print("URL SHORTENER".center(22))
    print("=" * 22)

    print()
    print("1. Shorten a URL")
    print("2. Look up a short code")
    print("3. Exit")
    print()

    choice = input("Enter your choice: ")

    if choice == "1":
          while True:
            long_url = input("Enter a long URL: ")

            if long_url.startswith("https://") or long_url.startswith("http://"):
                break
            else:
                print("Invalid URL. Please try again.")

          characters = string.ascii_letters + string.digits
          short_code = "".join(random.choices(characters,k=6))
          urls[short_code] = long_url
          print(f"Your short code is : {short_code}")
          #input("Press Enter to return to Menu... ")
           
      
    elif choice == "2":
            while True:
              short_code = input("Enter short code: ")
              if short_code in urls:
                print(f"The long URL is : {urls[short_code]}")
                break
              else:
                print("Not found")
                #input("Press Enter to return to Menu... ")

    elif choice == "3":
          print("Goodbye!")
          break
    else:
          print("Invalid choice")
          #input("Press Enter to return to Menu... ")
