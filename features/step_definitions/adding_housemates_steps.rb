Given(/^I have signed up$/) do
  visit '/'
  click_link 'Sign up'
  fill_in 'Email', with: 'bob@bob.com'
  fill_in 'Password', with: '12345678'
  fill_in 'Password confirmation', with: '12345678'
  click_button 'Sign up'
end

Given(/^created an abode$/) do
  page.find("#dropdown-menu").click
  click_link 'Add an abode'
  fill_in 'Name number', with: '25'
  fill_in 'Street', with: 'High Street'
  fill_in 'City', with: 'Oxford'
  fill_in 'County', with: 'Oxon'
  fill_in 'Postcode', with: 'OX1 4TE'
  click_button 'Submit'
end

When(/^I enter 'bob@gmail\.com' in the add housemate box$/) do
  fill_in 'email', with: 'bob@gmail.com'
end

When(/^I click Add housemate$/) do
  click_button 'Add'
end

Then(/^I should see 'Sorry, I cannot find bob@gmail\.com'$/) do
  expect(page).to have_content("Sorry, I cannot find bob@gmail.com")
end



When(/^I enter 'leo@gmail\.com' in the add housemate box$/) do
  User.create(email: 'leo@gmail.com', password: '12345678')
  fill_in 'email', with: 'leo@gmail.com'
end

Then(/^I should see 'Successfully added!'$/) do
  expect(page).to have_content("Successfully added!")
end