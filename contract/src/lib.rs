// Find all our documentation at https://docs.near.org
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{ near_bindgen, AccountId, env};
use near_sdk::collections::LookupMap;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)] // Borsh -> Nhị phân , Serialize -> Giải mã 
pub struct FungibleToken {
    user_accounts: LookupMap<AccountId, u128>,
    total_supply: u128,
}

impl Default for FungibleToken {
    fn default() -> Self {
        let mut contract: FungibleToken = FungibleToken {
            user_accounts: LookupMap::new(b'm'),
            total_supply: 100000,
        };
        let account_id = env::signer_account_id();
        contract.user_accounts.insert(&account_id, &contract.total_supply);
        return contract;
    }
}

#[near_bindgen]
impl FungibleToken {
    pub fn get_total_token(&self) -> u128{
        return self.total_supply.clone();
    }

    pub fn get_token_account(&self, account_id: AccountId) -> Option<u128> {
        return self.user_accounts.get(&account_id);
    }
}
