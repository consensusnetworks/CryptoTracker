import pprint
from datetime import datetime
from pycoingecko import CoinGeckoAPI #https://github.com/man-c/pycoingecko
cg = CoinGeckoAPI()

#Global variables
debugmode = False
input_filename = "datetimes.txt"
input_date_format = "%Y-%m-%d %I:%M" #This is based on what I saw in the Google Sheet

#If there's something wrong with the formatting or you want to change it, use this:
#https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior

def main():
  prices = [] #this is what's getting written to the output file
  
  print("Ready to read " + input_filename)
  crypto_name = input("Which cryptoasset do you want dollar amounts for? ") #e.g. bitcoin
  
  #load the contents of datetimes.txt to an array
  list_of_datetimes = get_dates_from_textfile()
  
  #get the price on each day
  for date_to_check in list_of_datetimes:
    coin_history = cg.get_coin_history_by_id(crypto_name, date_to_check)
    if (debugmode): pprint.pprint(coin_history)
    
    #The API returns a nested dict, so we'll need to drill down to get the info we need
    #Note: even though it says "current_price", it's actually for the given date
    usd = coin_history["market_data"]["current_price"]["usd"]

    print("On " + date_to_check + ", the price was " + str(usd))
    prices.append(usd)

  save_prices_to_textfile(crypto_name, prices)


##################
# Helper methods #
##################
def get_dates_from_textfile():
  datetime_list = []
  
  with open(input_filename) as input_file:
    for line in input_file:
      line = line.strip() #get rid of trailing spaces and junk
      if not line: break #stop looping if it's the end of the file
      try:
        converted_date = datetime.strptime(line, input_date_format) #Convert the text to a real datetime
      except ValueError:
        print("ERROR! \"" + line + "\" is supposed to be in this format: " + input_date_format)
        
      result = converted_date.strftime("%d-%m-%Y") #However...the CoinGecko API requires a string in dd-mm-yyyy format
      datetime_list.append(result)
  return datetime_list

def save_prices_to_textfile(crypto_name, prices):
  output_filename = crypto_name + "_prices.txt"
  newline = '\n'
  with open(output_filename, "w") as output_file:
    for price in prices:
      output_file.write(str(price) + newline)
  
  print("Saved to " + output_filename + "!")

main() #run the code