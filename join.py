import random
import string

characters = string.ascii_letters + string.digits

short_code = "".join(random.choices(characters, k=6))
print(short_code)