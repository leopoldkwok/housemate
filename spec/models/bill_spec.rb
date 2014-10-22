require 'rails_helper'

describe Bill, :type => :model do
    it 'should have a description and amount' do
      bill = Bill.create(description: 'taxes', amount: 30.00)
      expect(bill.description).to eq 'taxes'
      expect(bill.amount).to eq 30
    end

    it 'should not be settled when created' do
      bill = Bill.create(description: 'taxes', amount: 30.00)
      expect(bill.settled).to be false
    end
end
