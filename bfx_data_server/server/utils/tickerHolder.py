""" Ticker data holder """

from dataclasses import dataclass
from dataclasses_json import dataclass_json


@dataclass_json
@dataclass
class Ticker:
    '''Store ticker data to be updated'''
    symbol: str
    channel_name: str
    daily_change: float = -0.01
    daily_change_relative: float = -0.01
    last_price: float = -0.01   # latest coin price
    volume: float = -0.01
    high: float = -0.01
    low: float = -0.01

    def update(self, **args):
        """
            continually updates Tickers from bfxapi
        """
        for key, value in args.items():
            setattr(self, key, value)

    def __getitem__(self, symbol):
        return getattr(self, symbol)
